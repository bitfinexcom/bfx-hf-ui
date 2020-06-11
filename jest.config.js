module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],

  setupFiles: [
    'react-app-polyfill/jsdom',
  ],

  setupFilesAfterEnv: [],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],

  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(bfx-hf-chart)/)',
  ],

  resolver: 'jest-pnp-resolver',
  modulePaths: [
    'src',
  ],

  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(css|scss)$': '<rootDir>/jest/styleMock.js',
  },

  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],

  coverageReporters: [
    'lcov',
    'html',
  ],
}
