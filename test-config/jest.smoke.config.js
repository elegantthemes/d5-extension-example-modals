const { resolve } = require('path');

const pluginRootDirectory = resolve(__dirname, '..');

module.exports = {
  rootDir:    pluginRootDirectory,
  preset:     '@wordpress/jest-preset-default',
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
