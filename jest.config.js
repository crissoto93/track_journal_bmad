module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-gesture-handler|react-native-screens|react-native-vector-icons|react-native-paper|firebase|@firebase)/',
  ],
  moduleNameMapper: {
    '^react-native-vector-icons(/.*)?$': '<rootDir>/__mocks__/react-native-vector-icons.js',
    '^@env$': '<rootDir>/__mocks__/envMock.js',
  },
  testEnvironment: 'node',
  // Test reporting configuration
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test-reports/html',
        filename: 'test-report.html',
        expand: true,
        hideIcon: false,
        pageTitle: 'Track Journal Test Report',
        logoImgPath: undefined,
        inlineSource: true,
        darkTheme: false,
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: './test-reports/junit',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true,
      },
    ],
    ['<rootDir>/__tests__/utils/qa-reporter.js', {}],
  ],
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/index.ts',
    '!src/**/types/**',
  ],
  coverageDirectory: './test-reports/coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // Test results configuration
  verbose: true,
  testResultsProcessor: undefined,
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/utils/qa-reporter.js'
  ],
};
