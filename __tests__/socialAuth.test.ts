import { signInWithGoogle, signInWithApple, initializeGoogleSignIn } from '../src/services/socialAuth';
import { getFirebase } from '../src/services/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';

// Mock the firebase service
jest.mock('../src/services/firebase');
const mockGetFirebase = getFirebase as jest.MockedFunction<typeof getFirebase>;

// Mock social auth libraries
jest.mock('@react-native-google-signin/google-signin');
jest.mock('@invertase/react-native-apple-authentication');

// Mock Firebase Auth functions
const mockSignInWithCredential = jest.fn();
const mockOAuthProviderCredential = jest.fn();

jest.mock('firebase/auth', () => ({
  signInWithCredential: mockSignInWithCredential,
  OAuthProvider: {
    credential: mockOAuthProviderCredential,
  },
}));

describe('Social Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFirebase.mockResolvedValue({
      app: {},
      auth: {},
      db: {},
    });
  });

  describe('initializeGoogleSignIn', () => {
    it('should configure Google Sign-In', () => {
      const mockConfigure = jest.fn();
      (GoogleSignin.configure as jest.Mock) = mockConfigure;

      initializeGoogleSignIn();

             expect(mockConfigure).toHaveBeenCalledWith({
         webClientId: '240839547185-ks6rdb5ldpe4mvm1icu51v9vt98kbv3k.apps.googleusercontent.com',
         offlineAccess: true,
       });
    });
  });

  describe('signInWithGoogle', () => {
    it('should successfully sign in with Google', async () => {
      const mockUserInfo = {
        idToken: 'mock-google-id-token',
        user: {
          id: 'google-user-id',
          email: 'test@example.com',
          name: 'Test User',
        },
      };

      const mockUserCredential = {
        user: {
          uid: 'firebase-user-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        additionalUserInfo: {
          isNewUser: true,
        },
      };

      (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
      (GoogleSignin.signIn as jest.Mock).mockResolvedValue(mockUserInfo);
      mockOAuthProviderCredential.mockReturnValue('mock-credential');
      mockSignInWithCredential.mockResolvedValue(mockUserCredential);

      const result = await signInWithGoogle();

      expect(result.success).toBe(true);
      expect(result.user).toEqual({
        uid: 'firebase-user-uid',
        email: 'test@example.com',
        displayName: 'Test User',
      });
      expect(result.isNewUser).toBe(true);
      expect(mockOAuthProviderCredential).toHaveBeenCalledWith('google.com', 'mock-google-id-token');
    });

    it('should handle Firebase not initialized error', async () => {
      mockGetFirebase.mockResolvedValue(null);

      const result = await signInWithGoogle();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('firebase-not-initialized');
      expect(result.error?.message).toBe('Firebase is not properly initialized');
    });

    it('should handle Google Sign-In failure', async () => {
      (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
      (GoogleSignin.signIn as jest.Mock).mockResolvedValue({ idToken: null });

      const result = await signInWithGoogle();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('google-signin-failed');
      expect(result.error?.message).toBe('Google Sign-In failed - no ID token received');
    });

    it('should handle Google Sign-In error', async () => {
      const error = new Error('Google Sign-In error');
      (GoogleSignin.hasPlayServices as jest.Mock).mockRejectedValue(error);

      const result = await signInWithGoogle();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('unknown-error');
      expect(result.error?.message).toBe('Google Sign-In error');
    });
  });

  describe('signInWithApple', () => {
    it('should successfully sign in with Apple', async () => {
      const mockAppleAuthResponse = {
        identityToken: 'mock-apple-identity-token',
        fullName: {
          givenName: 'Test',
          familyName: 'User',
        },
        email: 'test@example.com',
      };

      const mockUserCredential = {
        user: {
          uid: 'firebase-user-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        additionalUserInfo: {
          isNewUser: true,
        },
      };

      (appleAuth.isSupported as jest.Mock).mockResolvedValue(true);
      (appleAuth.performRequest as jest.Mock).mockResolvedValue(mockAppleAuthResponse);
      mockOAuthProviderCredential.mockReturnValue('mock-credential');
      mockSignInWithCredential.mockResolvedValue(mockUserCredential);

      const result = await signInWithApple();

      expect(result.success).toBe(true);
      expect(result.user).toEqual({
        uid: 'firebase-user-uid',
        email: 'test@example.com',
        displayName: 'Test User',
      });
      expect(result.isNewUser).toBe(true);
      expect(mockOAuthProviderCredential).toHaveBeenCalledWith('apple.com', 'mock-apple-identity-token');
    });

    it('should handle Firebase not initialized error', async () => {
      mockGetFirebase.mockResolvedValue(null);

      const result = await signInWithApple();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('firebase-not-initialized');
      expect(result.error?.message).toBe('Firebase is not properly initialized');
    });

    it('should handle Apple Sign-In not supported', async () => {
      (appleAuth.isSupported as jest.Mock).mockResolvedValue(false);

      const result = await signInWithApple();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('apple-signin-not-supported');
      expect(result.error?.message).toBe('Apple Sign-In is not supported on this device');
    });

    it('should handle Apple Sign-In failure', async () => {
      (appleAuth.isSupported as jest.Mock).mockResolvedValue(true);
      (appleAuth.performRequest as jest.Mock).mockResolvedValue({ identityToken: null });

      const result = await signInWithApple();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('apple-signin-failed');
      expect(result.error?.message).toBe('Apple Sign-In failed - no identity token received');
    });

    it('should handle Apple Sign-In error', async () => {
      const error = new Error('Apple Sign-In error');
      (appleAuth.isSupported as jest.Mock).mockResolvedValue(true);
      (appleAuth.performRequest as jest.Mock).mockRejectedValue(error);

      const result = await signInWithApple();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('unknown-error');
      expect(result.error?.message).toBe('Apple Sign-In error');
    });
  });
});
