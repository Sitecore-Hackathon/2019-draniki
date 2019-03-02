const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Ensure that env is setup
require('./env');
const paths = require('./paths');

// Webpack build configuration to build the SSR bundle.
// Invoked by build:server.

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    server: paths.appServerIndexTs,
  },
  output: {
    path: paths.appBuild,
    filename: '[name].bundle.js',
    libraryTarget: 'this', // this option is required for use with JavaScriptViewEngine
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('ts-loader'),
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: require.resolve('html-loader') },
      },
      {
        test: /\.(graphql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        // anything not TS or HTML, we load as a URL
        // this makes static image imports work with SSR
        test: /\.(?!ts|tsx|html|graphql$)[^.]+$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        // anything in node_modules that isn't js,
        // we load as null - e.g. imported css from a module,
        // that is not needed for SSR
        test: /\.(?!js|html|graphql$)[^.]+$/,
        include: /node_modules/,
        use: {
          loader: 'null-loader',
        },
      },
    ],
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: ['node_modules'].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    alias: {
      Foundation: path.resolve(process.cwd(), './Foundation/'),
      Project: path.resolve(process.cwd(), './Project/'),
      Feature: path.resolve(process.cwd(), './Feature/'),
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      include: ['/Project/', '/Feature/', '/Foundation/'],
      tsconfig: './tsconfig.json',
      tslint: './tslint.json',
    }),
  ],
};
