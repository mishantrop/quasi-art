const path = require('path')
// const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()

module.exports = (env) => {
  const config = {
    entry: path.resolve(__dirname, 'assets/templates/main/js/src/index.ts'),
    target: [ 'web', 'es5' ],
    output: {
      path: path.resolve(__dirname, 'assets/templates/main/dist'),
      filename: 'main.min.js',
    },
    resolve: {
      extensions: [ '.js', '.ts' ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': 'production',
      // }),
      ...env && env.ANALYZE === '1'
        ? [ new BundleAnalyzerPlugin() ]
        : [],
    ],
    stats: {
      colors: true,
    },
    devtool: 'source-map',
  }

  return smp.wrap(config)
}
