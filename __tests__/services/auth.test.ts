import { signIn, signUp, sendPasswordResetEmail } from '../../src/services/auth';

// Mock the firebase service first
jest.mock('../../src/services/firebase', () => ({
  getFirebase: jest.fn().mockResolvedValue({
    app: {},
    auth: {},
    db: {},
  }),
}));

// Mock Firebase Auth functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

// Import the mocked functions
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth';

describe('Auth Service', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';
  const mockUser = {
    uid: 'test-uid',
    email: mockEmail,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      const mockUserCredential = {
        user: mockUser,
      };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

      const result = await signIn(mockEmail, mockPassword);

      expect(result.success).toBe(true);
      expect(result.user).toEqual({
        uid: 'test-uid',
        email: mockEmail,
      });
    });

    it('should handle authentication error', async () => {
      const authError = new Error('Invalid email or password');
      (authError as any).code = 'auth/user-not-found';
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(authError);

      const result = await signIn(mockEmail, 'wrongpassword');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('auth/user-not-found');
      expect(result.error?.message).toBe('Invalid email or password');
    });
  });

  describe('signUp', () => {
    it('should successfully create a new user', async () => {
      const mockUserCredential = {
        user: mockUser,
      };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

      const result = await signUp(mockEmail, mockPassword);

      expect(result.success).toBe(true);
      expect(result.user).toEqual({
        uid: 'test-uid',
        email: mockEmail,
      });
    });

    it('should handle email already in use error', async () => {
      const authError = new Error('Email already in use');
      (authError as any).code = 'auth/email-already-in-use';
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(authError);

      const result = await signUp(mockEmail, mockPassword);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('auth/email-already-in-use');
      expect(result.error?.message).toBe('Email already in use');
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should successfully send password reset email', async () => {
      (firebaseSendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);

      const result = await sendPasswordResetEmail(mockEmail);

      expect(result.success).toBe(true);
    });

    it('should handle user not found error', async () => {
      const authError = new Error('No user found with this email');
      (authError as any).code = 'auth/user-not-found';
      (firebaseSendPasswordResetEmail as jest.Mock).mockRejectedValue(authError);

      const result = await sendPasswordResetEmail('nonexistent@example.com');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('auth/user-not-found');
      expect(result.error?.message).toBe('No user found with this email');
    });
  });
});
