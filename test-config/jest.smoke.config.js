const { resolve } = require('path');

const pluginRootDirectory = resolve(__dirname, '..');

module.exports = {
  rootDir:    pluginRootDirectory,
  preset:     '@wordpress/jest-preset-default',
  moduleNameMapper: {
    '^react$':                 resolve( pluginRootDirectory, 'node_modules/react' ),
    '^react-dom$':             resolve( pluginRootDirectory, 'node_modules/react-dom' ),
    '^react-dom/server$':      resolve( pluginRootDirectory, 'node_modules/react-dom/server' ),
    '^@divi/modal$':           resolve(__dirname, 'mocks/divi-modal.jsx'),
    '^@divi/error-boundary$':  resolve(__dirname, 'mocks/divi-error-boundary.jsx'),
    '^@divi/field-library$':   resolve(__dirname, 'mocks/divi-field-library.jsx'),
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
