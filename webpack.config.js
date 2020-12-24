const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  const config = {
    entry: path.resolve(__dirname, 'assets/templates/main/js/src/index.js'),
    target: [ 'web', 'es5' ],
    output: {
      path: path.resolve(__dirname, 'assets/templates/main/dist'),
      filename: 'main.min.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // exclude: /node_modules\/(?!quasiform)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [ '@babel/preset-env', {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: {
                    browsers: '> 1%, IE 11, not dead',
                  },
                } ],
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production',
      }),
    ],
    stats: {
      colors: true,
    },
    devtool: 'source-map',
  };

  if (env && env.ANALYZE === '1') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
