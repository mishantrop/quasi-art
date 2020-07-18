const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  const config = {
    entry: path.resolve(__dirname, 'assets/templates/main/js/src/index.js'),
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'assets/templates/main/dist'),
      filename: 'main.min.js',
    },
    module: {
      loaders: [ {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          plugins: [
            'babel-plugin-transform-class-properties',
          ],
          presets: [
            [ 'env', {
              targets: {
                browsers: [
                  'last 2 versions',
                  'safari >= 7',
                ],
              },
              include: [
                'transform-es2015-arrow-functions',
                'es6.map',
              ],
              modules: false,
              useBuiltIns: 'entry',
            } ],
          ],
        },
      } ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production',
      }),
      new UglifyJSPlugin(),
    ],
    stats: {
      colors: true,
    },
    devtool: 'source-map',
  };

  if (env && env.ANALYZE === 1) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
