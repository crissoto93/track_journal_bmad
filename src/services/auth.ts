import { getFirebase } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail as firebaseSendPasswordResetEmail, UserCredential } from 'firebase/auth';

export interface AuthError {
  code: string;
  message: string;
}

export interface SignUpResult {
  success: boolean;
  user?: {
    uid: string;
    email: string | null;
  };
  error?: AuthError;
}

export async function signUp(email: string, password: string): Promise<SignUpResult> {
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

    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );

    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred during sign up'
      }
    };
  }
}

export interface LoginResult {
  success: boolean;
  user?: {
    uid: string;
    email: string | null;
  };
  error?: AuthError;
}

export async function signIn(email: string, password: string): Promise<LoginResult> {
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

    const userCredential: UserCredential = await signInWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );

    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred during sign in'
      }
    };
  }
}

export interface PasswordResetResult {
  success: boolean;
  error?: AuthError;
}

export async function sendPasswordResetEmail(email: string): Promise<PasswordResetResult> {
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

    await firebaseSendPasswordResetEmail(firebase.auth, email);

    return {
      success: true
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred while sending reset email'
      }
    };
  }
}
