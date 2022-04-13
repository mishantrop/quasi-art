const path = require('path')
// const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()

module.exports = (env, argv) => {
  console.log(argv)

  const isDev = argv.mode === 'development'

  const isAnalyzeEnabled = env.ANALYZE === '1'
  const isAnalyzeNeedReport = env.ANALYZENEEDREPORT === '1'
  const analyzerMode = env.ANALYZERMODE || 'json'

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
      ...isAnalyzeEnabled
        ? [
            new BundleAnalyzerPlugin({
              generateStatsFile: isAnalyzeNeedReport,
              analyzerMode,
              openAnalyzer: !isAnalyzeNeedReport,
              defaultSizes: 'gzip',
            }),
          ]
        : [],
    ],
    stats: {
      colors: true,
    },
    devtool: isDev ? 'source-map' : undefined,
  }

  return smp.wrap(config)
}
