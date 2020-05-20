const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = {
  target: 'web',
  //  watch: true,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: [['env', {
            targets: {
              chrome: 52,
            },
            modules: false,
            useBuiltIns: true,
          }]]
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production'
    }),
  ],
  stats: {
    colors: true
  },
  devtool: 'production',
};

const mainConfig = Object.assign({}, config, {
  name: 'main',
  entry: path.resolve(__dirname, '../assets/templates/main/js/src/index.js'),
  output: {
    path: path.resolve(__dirname, '../assets/templates/main/js/dist'),
    filename: 'main.min.js'
  },
});
module.exports = [mainConfig];
