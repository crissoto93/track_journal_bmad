import { getFirebase } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface UserProfile {
  id: string;
  email: string;
  createdAt: any; // Firestore timestamp
}

export interface CreateUserProfileResult {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

export async function createUserProfile(uid: string, email: string): Promise<CreateUserProfileResult> {
  try {
    const firebase = await getFirebase();
    if (!firebase) {
      return {
        success: false,
        error: {
          code: 'firebase-not-initialized',
          message: 'Firebase is not properly initialized'
        }
      };
    }

    const userProfile: UserProfile = {
      id: uid,
      email,
      createdAt: serverTimestamp()
    };

    await setDoc(doc(firebase.db, 'users', uid), userProfile);

    return {
      success: true
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred while creating user profile'
      }
    };
  }
}
