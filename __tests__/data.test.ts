import { createUserProfile } from '../src/services/data';
import { getFirebase } from '../src/services/firebase';

// Mock the firebase service
jest.mock('../src/services/firebase');
const mockGetFirebase = getFirebase as jest.MockedFunction<typeof getFirebase>;

// Mock Firestore functions
const mockSetDoc = jest.fn();
const mockDoc = jest.fn();
const mockServerTimestamp = jest.fn();

jest.mock('firebase/firestore', () => ({
  setDoc: mockSetDoc,
  doc: mockDoc,
  serverTimestamp: mockServerTimestamp,
}));

describe('Data Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFirebase.mockResolvedValue({
      app: {},
      auth: {},
      db: {},
    });
    mockDoc.mockReturnValue('mock-doc-ref');
    mockServerTimestamp.mockReturnValue('mock-timestamp');
  });

  describe('createUserProfile', () => {
    it('should successfully create a user profile', async () => {
      mockSetDoc.mockResolvedValue(undefined);

      const result = await createUserProfile('test-uid', 'test@example.com');

      expect(result.success).toBe(true);
      expect(mockDoc).toHaveBeenCalledWith({}, 'users', 'test-uid');
      expect(mockSetDoc).toHaveBeenCalledWith('mock-doc-ref', {
        id: 'test-uid',
        email: 'test@example.com',
        createdAt: 'mock-timestamp',
      });
    });

    it('should handle Firebase not initialized error', async () => {
      mockGetFirebase.mockResolvedValue(null);

      const result = await createUserProfile('test-uid', 'test@example.com');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('firebase-not-initialized');
      expect(result.error?.message).toBe('Firebase is not properly initialized');
    });

    it('should handle Firestore write error', async () => {
      const firestoreError = new Error('Permission denied');
      (firestoreError as any).code = 'permission-denied';
      mockSetDoc.mockRejectedValue(firestoreError);

      const result = await createUserProfile('test-uid', 'test@example.com');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('permission-denied');
      expect(result.error?.message).toBe('Permission denied');
    });

    it('should handle network error', async () => {
      const networkError = new Error('Network error');
      (networkError as any).code = 'unavailable';
      mockSetDoc.mockRejectedValue(networkError);

      const result = await createUserProfile('test-uid', 'test@example.com');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('unavailable');
      expect(result.error?.message).toBe('Network error');
    });

    it('should handle unknown error', async () => {
      const unknownError = new Error('Unknown error occurred');
      mockSetDoc.mockRejectedValue(unknownError);

      const result = await createUserProfile('test-uid', 'test@example.com');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('unknown-error');
      expect(result.error?.message).toBe('Unknown error occurred');
    });
  });
});
