import { firebaseEnv, hasFirebaseConfig, shouldUseEmulators } from '../config/env';

export type FirebaseServices = {
  app: any;
  auth: any;
  db: any;
} | null;

let cachedServices: FirebaseServices = null;

export async function getFirebase(): Promise<FirebaseServices> {
  if (cachedServices) return cachedServices;

  if (!hasFirebaseConfig()) {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.warn('Firebase env not set; skipping initialization');
    }
    return null;
  }

  // In test environment, return mock services
  if (typeof jest !== 'undefined' || process.env.NODE_ENV === 'test') {
    return {
      app: {},
      auth: {},
      db: {},
    };
  }

  const { initializeApp, getApps } = await import('firebase/app');
  const { getAuth } = await import('firebase/auth');
  const { getFirestore } = await import('firebase/firestore');
  const { connectAuthEmulator } = await import('firebase/auth');
  const { connectFirestoreEmulator } = await import('firebase/firestore');

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        apiKey: firebaseEnv.FIREBASE_API_KEY,
        appId: firebaseEnv.FIREBASE_APP_ID,
        projectId: firebaseEnv.FIREBASE_PROJECT_ID,
        messagingSenderId: firebaseEnv.FIREBASE_MESSAGING_SENDER_ID,
        storageBucket: firebaseEnv.FIREBASE_STORAGE_BUCKET,
        authDomain: firebaseEnv.FIREBASE_AUTH_DOMAIN,
      });

  const auth = getAuth(app);
  const db = getFirestore(app);

  if (shouldUseEmulators()) {
    try {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      connectFirestoreEmulator(db as any, '127.0.0.1', 8080);
    } catch (e) {
      console.warn('Failed to connect to Firebase emulators. Are they running?', e);
    }
  }

  cachedServices = { app, auth, db };
  return cachedServices;
}
