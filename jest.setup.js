import 'react-native-gesture-handler/jestSetup';

// Mock react-native-screens to avoid native dependency in tests
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));