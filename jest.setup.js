import 'react-native-gesture-handler/jestSetup';

// Configure jest globals
/* global jest */

// Mock react-native-screens to avoid native dependency in tests
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));