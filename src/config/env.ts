import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_USE_EMULATORS,
  JEST_USE_EMULATORS,
} from '@env';

export type FirebaseEnv = {
  FIREBASE_API_KEY?: string;
  FIREBASE_APP_ID?: string;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_MESSAGING_SENDER_ID?: string;
  FIREBASE_STORAGE_BUCKET?: string;
  FIREBASE_AUTH_DOMAIN?: string;
};

export const firebaseEnv: FirebaseEnv = {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_AUTH_DOMAIN,
};

export const hasFirebaseConfig = (): boolean =>
  Boolean(FIREBASE_API_KEY && FIREBASE_APP_ID && FIREBASE_PROJECT_ID);

export const shouldUseEmulators = (): boolean => {
  // Allow either flag to enable emulator wiring in dev/test
  if (typeof JEST_USE_EMULATORS !== 'undefined' && JEST_USE_EMULATORS === 'true') return true;
  if (typeof FIREBASE_USE_EMULATORS !== 'undefined' && FIREBASE_USE_EMULATORS === 'true') return true;
  return false;
};

