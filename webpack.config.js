'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const webpack = require('webpack');
const extension = require('./extension');
const camelCase = require('camelcase');
const capitalize = require('capitalize');
const createEntryFile = require('./createEntryFile');

const entries = {
  'babel-polyfill': 'babel-polyfill'
};
const plugins = [];

module.exports = (env) => {
  // Each view becomes its own "app". These are automatically generated based on naming convention.
  ['configuration', 'action'].forEach((type) => {
    const typePluralized = type + 's';
    const delegates =
      type === 'configuration'
        ? [extension['configuration']]
        : extension[typePluralized];

    delegates.forEach((itemDescriptor) => {
      let itemNameCapitalized;
      let chunkName;

      if (itemDescriptor.viewPath) {
        if (type === 'configuration') {
          itemNameCapitalized = 'Configuration';
          chunkName = 'configuration/configuration';
        } else {
          const itemName = itemDescriptor.name;
          const itemNameCamelized = camelCase(itemName);
          itemNameCapitalized = capitalize(itemNameCamelized);
          chunkName = `${itemDescriptor.viewPath.replace('.html', '')}`;
        }

        const entryPath = `./.entries/${chunkName}.js`;
        createEntryFile(entryPath, itemNameCapitalized, chunkName);
        entries[chunkName] = entryPath;

        plugins.push(
          new HtmlWebpackPlugin({
            title: itemDescriptor.displayName || 'Configuration',
            filename: `${chunkName}.html`,
            template: 'src/view/template.html',
            chunks: ['common', chunkName]
          })
        );
      }
    });
  });

  plugins.push(
    new webpack.DefinePlugin({
      'process.env.SCALE_MEDIUM': 'true',
      'process.env.SCALE_LARGE': 'false',
      'process.env.THEME_LIGHT': 'false',
      'process.env.THEME_LIGHTEST': 'true',
      'process.env.THEME_DARK': 'false',
      'process.env.THEME_DARKEST': 'false'
    })
  );

  if (env === 'sandbox') {
    // This allows us to run the sandbox after the initial build takes place. By not starting up the
    // sandbox while simultaneously building the view, we ensure:
    // (1) Whatever we see in the browser contains the latest view files.
    // (2) The sandbox can validate our extension.json and find that the view files it references
    // actually exist because they have already been built.
    plugins.push(
      new WebpackShellPlugin({
        onBuildEnd: ['./node_modules/.bin/reactor-sandbox']
      })
    );
  }

  let minChunks = Math.round(Object.keys(entries).length / 4);
  if (minChunks < 2) {
    minChunks = 2;
  }

  return {
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            name: 'common',
            chunks: 'all',
            minChunks: minChunks
          }
        }
      }
    },
    entry: entries,
    plugins: plugins,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: /src\/view/,
          loader: 'babel-loader'
        },
        {
          test: /\.js$/,
          include: /\.entries/,
          loader: 'babel-loader'
        },
        {
          test: /\.styl/,
          include: /src\/view/,
          loader: 'style-loader!css-loader!stylus-loader'
        },
        {
          test: /\.css/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'file-loader'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,

          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
