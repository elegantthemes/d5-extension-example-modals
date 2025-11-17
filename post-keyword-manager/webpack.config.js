const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    '@divi/ui-library': ['divi', 'uiLibrary'],
    '@divi/tooltip': ['divi', 'tooltip'],
    '@divi/field-library': ['divi', 'fieldLibrary'],
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
      },
      {
        test: /\.css$/,
        use: [
          // Loader that enables imported css to be extracted and outputted into its own file.
          // @see https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options
          {
            loader: MiniCssExtractPlugin.loader,
          },

          // Loader that interprets @import and url() like import/require() and resolve them.
          // @see https://webpack.js.org/loaders/css-loader/
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../styles/[name].css',
    }),
  ],
  mode: process.env.NODE_ENV || 'development',
  watchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/build/**',
      '**/.git/**',
    ],
    aggregateTimeout: 300,
    poll: false,
  },
};

