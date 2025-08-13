module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-gesture-handler|react-native-screens|react-native-vector-icons|react-native-paper)/',
  ],
  moduleNameMapper: {
    '^react-native-vector-icons(/.*)?$': '<rootDir>/__mocks__/react-native-vector-icons.js',
    '^@env$': '<rootDir>/__mocks__/envMock.js',
  },
};
