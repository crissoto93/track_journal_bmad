import { signIn, signUp, sendPasswordResetEmail } from '../src/services/auth';
import { getFirebase } from '../src/services/firebase';

// Mock the firebase service
jest.mock('../src/services/firebase');
const mockGetFirebase = getFirebase as jest.MockedFunction<typeof getFirebase>;

// Mock Firebase Auth functions
const mockSignInWithEmailAndPassword = jest.fn();
const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSendPasswordResetEmail = jest.fn();

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  sendPasswordResetEmail: mockSendPasswordResetEmail,
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFirebase.mockResolvedValue({
      app: {},
      auth: {},
      db: {},
    });
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
      };
      const mockUserCredential = {
        user: mockUser,
      };

      mockSignInWithEmailAndPassword.mockResolvedValue(mockUserCredential);

      const result = await signIn('test@example.com', 'password123');

      expect(result.success).toBe(true);
      expect(result.user).toEqual({
        uid: 'test-uid',
        email: 'test@example.com',
      });
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'password123');
    });

    it('should handle Firebase not initialized error', async () => {
      mockGetFirebase.mockResolvedValue(null);

      const result = await signIn('test@example.com', 'password123');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('firebase-not-initialized');
      expect(result.error?.message).toBe('Firebase is not properly initialized');
    });

    it('should handle authentication error', async () => {
      const authError = new Error('Invalid email or password');
      (authError as any).code = 'auth/user-not-found';
      mockSignInWithEmailAndPassword.mockRejectedValue(authError);

      const result = await signIn('test@example.com', 'wrongpassword');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('auth/user-not-found');
      expect(result.error?.message).toBe('Invalid email or password');
    });
  });

  describe('signUp', () => {
    it('should successfully create a new user', async () => {
      const mockUser = {
        uid: 'new-user-uid',
        email: 'newuser@example.com',
      };
      const mockUserCredential = {
        user: mockUser,
      };

      mockCreateUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);

      const result = await signUp('newuser@example.com', 'password123');

      expect(result.success).toBe(true);
      expect(result.user).toEqual({
        uid: 'new-user-uid',
        email: 'newuser@example.com',
      });
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'newuser@example.com', 'password123');
    });

    it('should handle Firebase not initialized error', async () => {
      mockGetFirebase.mockResolvedValue(null);

      const result = await signUp('newuser@example.com', 'password123');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('firebase-not-initialized');
      expect(result.error?.message).toBe('Firebase is not properly initialized');
    });

    it('should handle email already in use error', async () => {
      const authError = new Error('Email already in use');
      (authError as any).code = 'auth/email-already-in-use';
      mockCreateUserWithEmailAndPassword.mockRejectedValue(authError);

      const result = await signUp('existing@example.com', 'password123');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('auth/email-already-in-use');
      expect(result.error?.message).toBe('Email already in use');
    });

    it('should handle weak password error', async () => {
      const authError = new Error('Password should be at least 6 characters');
      (authError as any).code = 'auth/weak-password';
      mockCreateUserWithEmailAndPassword.mockRejectedValue(authError);

      const result = await signUp('test@example.com', '123');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('auth/weak-password');
      expect(result.error?.message).toBe('Password should be at least 6 characters');
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should successfully send password reset email', async () => {
      mockSendPasswordResetEmail.mockResolvedValue(undefined);

      const result = await sendPasswordResetEmail('test@example.com');

      expect(result.success).toBe(true);
      expect(mockSendPasswordResetEmail).toHaveBeenCalledWith({}, 'test@example.com');
    });

    it('should handle Firebase not initialized error', async () => {
      mockGetFirebase.mockResolvedValue(null);

      const result = await sendPasswordResetEmail('test@example.com');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('firebase-not-initialized');
      expect(result.error?.message).toBe('Firebase is not properly initialized');
    });

    it('should handle user not found error', async () => {
      const authError = new Error('No user found with this email');
      (authError as any).code = 'auth/user-not-found';
      mockSendPasswordResetEmail.mockRejectedValue(authError);

      const result = await sendPasswordResetEmail('nonexistent@example.com');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('auth/user-not-found');
      expect(result.error?.message).toBe('No user found with this email');
    });

    it('should handle invalid email error', async () => {
      const authError = new Error('Invalid email address');
      (authError as any).code = 'auth/invalid-email';
      mockSendPasswordResetEmail.mockRejectedValue(authError);

      const result = await sendPasswordResetEmail('invalid-email');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('auth/invalid-email');
      expect(result.error?.message).toBe('Invalid email address');
    });
  });
});
