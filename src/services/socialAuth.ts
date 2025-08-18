import { getFirebase } from './firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { signInWithCredential, GoogleAuthProvider, OAuthProvider, UserCredential } from 'firebase/auth';
import { createUserProfile } from './data';

export interface SocialAuthError {
  code: string;
  message: string;
}

export interface SocialAuthResult {
  success: boolean;
  user?: {
    uid: string;
    email: string | null;
    displayName?: string | null;
  };
  error?: SocialAuthError;
  isNewUser?: boolean;
}

// Initialize Google Sign-In
export function initializeGoogleSignIn(): void {
  GoogleSignin.configure({
    // Using the web client ID from google-services.json
    webClientId: '240839547185-ks6rdb5ldpe4mvm1icu51v9vt98kbv3k.apps.googleusercontent.com',
    offlineAccess: true,
  });
}

export async function signInWithGoogle(): Promise<SocialAuthResult> {
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

    // Check if device supports Google Sign-In
    await GoogleSignin.hasPlayServices();

    // Sign in with Google and get tokens
    await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    
    if (!tokens.idToken) {
      return {
        success: false,
        error: {
          code: 'google-signin-failed',
          message: 'Google Sign-In failed - no ID token received'
        }
      };
    }

    // Create Firebase credential using GoogleAuthProvider with ID token
    const credential = GoogleAuthProvider.credential(tokens.idToken);

    // Sign in to Firebase
    const userCredential: UserCredential = await signInWithCredential(
      firebase.auth,
      credential
    );

    const user = userCredential.user;
    // Check if user is new by comparing creation time with last sign-in time
    const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

    // If this is a new user, create their profile
    if (isNewUser && user.email) {
      const profileResult = await createUserProfile(
        user.uid,
        user.email,
        user.displayName || undefined
      );

      if (!profileResult.success) {
        console.warn('Failed to create user profile:', profileResult.error);
        // Don't fail the sign-in, just log the warning
      }
    }

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      },
      isNewUser
    };

  } catch (error: any) {
    console.error('Google Sign-In error details:', {
      code: error.code,
      message: error.message,
      fullError: error
    });
    
    let errorCode = 'unknown-error';
    let errorMessage = 'An unknown error occurred during Google Sign-In';

    if (error.code) {
      errorCode = error.code;
      errorMessage = error.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Add specific handling for DEVELOPER_ERROR
    if (errorCode === 'DEVELOPER_ERROR') {
      errorMessage = 'Google Sign-In configuration error. Please check your Google Cloud Console settings and SHA-1 fingerprint.';
    }

    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage
      }
    };
  }
}

export async function signInWithApple(): Promise<SocialAuthResult> {
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

    // Check if Apple Sign-In is available
    const isAvailable = await appleAuth.isSupported;
    if (!isAvailable) {
      return {
        success: false,
        error: {
          code: 'apple-signin-not-supported',
          message: 'Apple Sign-In is not supported on this device'
        }
      };
    }

    // Request Apple Sign-In
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [
        appleAuth.Scope.EMAIL,
        appleAuth.Scope.FULL_NAME
      ],
    });

    if (!appleAuthRequestResponse.identityToken) {
      return {
        success: false,
        error: {
          code: 'apple-signin-failed',
          message: 'Apple Sign-In failed - no identity token received'
        }
      };
    }

    // Create Firebase credential using OAuthProvider
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({
      idToken: appleAuthRequestResponse.identityToken,
    });

    // Sign in to Firebase
    const userCredential: UserCredential = await signInWithCredential(
      firebase.auth,
      credential
    );

    const user = userCredential.user;
    // Check if user is new by comparing creation time with last sign-in time
    const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

    // If this is a new user, create their profile
    if (isNewUser && user.email) {
      const profileResult = await createUserProfile(
        user.uid,
        user.email,
        user.displayName || undefined
      );

      if (!profileResult.success) {
        console.warn('Failed to create user profile:', profileResult.error);
        // Don't fail the sign-in, just log the warning
      }
    }

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      },
      isNewUser
    };

  } catch (error: any) {
    console.error('Apple Sign-In error:', error);
    
    let errorCode = 'unknown-error';
    let errorMessage = 'An unknown error occurred during Apple Sign-In';

    if (error.code) {
      errorCode = error.code;
      errorMessage = error.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage
      }
    };
  }
}

export async function signOutFromGoogle(): Promise<void> {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error('Error signing out from Google:', error);
  }
}
