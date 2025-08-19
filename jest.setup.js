import 'react-native-gesture-handler/jestSetup';

// Configure jest globals
/* global jest */

// Mock react-native-screens to avoid native dependency in tests
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

// Mock social auth libraries
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn(),
    signOut: jest.fn(),
    isSignedIn: jest.fn(),
    getCurrentUser: jest.fn(),
    getTokens: jest.fn(),
  },
}));

jest.mock('@invertase/react-native-apple-authentication', () => ({
  appleAuth: {
    isSupported: jest.fn().mockResolvedValue(true),
    performRequest: jest.fn(),
    getCredentialStateForUser: jest.fn(),
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REFRESH: 'REFRESH',
  },
}));

// Mock Firebase modules
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signInWithCredential: jest.fn(),
  OAuthProvider: {
    credential: jest.fn(),
  },
  connectAuthEmulator: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(() => 'mock-timestamp'),
  connectFirestoreEmulator: jest.fn(),
}));