const { resolve } = require('path');

const pluginRootDirectory = resolve(__dirname, '..');

module.exports = {
  rootDir:    pluginRootDirectory,
  preset:     '@wordpress/jest-preset-default',
  moduleNameMapper: {
    '^@divi/data$':            resolve(__dirname, 'mocks/divi-data.js'),
    '^@divi/modal$':           resolve(__dirname, 'mocks/divi-modal.jsx'),
    '^@divi/error-boundary$':  resolve(__dirname, 'mocks/divi-error-boundary.jsx'),
  },
  testMatch:  [
    '<rootDir>/module-visibility-manager/**/__tests__/**/*.test.[jt]s?(x)',
    '<rootDir>/post-keyword-manager/**/__tests__/**/*.test.[jt]s?(x)',
    '<rootDir>/modal-field-showcase/**/__tests__/**/*.test.[jt]s?(x)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': resolve(__dirname, 'babel-transformer.js'),
  },
  setupFilesAfterEnv: [
    resolve(__dirname, 'jest-rtl-setup.js'),
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test-config/',
  ],
};
