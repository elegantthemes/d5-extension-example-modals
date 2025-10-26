const path = require('path');

module.exports = {
  entry: {
    bundle: './src/index.jsx',
    'add-toolbar-button': './src/add-toolbar-button.js',
  },
  externals: {
    // Third-party libraries.
    jquery: 'jQuery',
    underscore: '_',
    lodash: 'lodash',
    react: ['vendor', 'React'],
    'react-dom': ['vendor', 'ReactDOM'],
    
    // WordPress libraries.
    '@wordpress/i18n': ['vendor', 'wp', 'i18n'],
    '@wordpress/hooks': ['vendor', 'wp', 'hooks'],

    // Divi libraries.
    '@divi/rest': ['divi', 'rest'],
    '@divi/data': ['divi', 'data'],
    '@divi/modal': ['divi', 'modal'],
    '@divi/icon-library': ['divi', 'iconLibrary'],
    '@divi/app-ui': ['divi', 'appUi'],
    '@divi/error-boundary': ['divi', 'errorBoundary'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: false,
              presets: [
                ['@babel/preset-env', {
                  modules: false,
                  targets: '> 5%',
                }],
                '@babel/preset-react',
              ],
            },
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  mode: process.env.NODE_ENV || 'development',
};

