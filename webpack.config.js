const path = require('path');
const CopyrightWebpackPlugin = require('./plugins/copyright/copyright.webpack.plugin');
const OutputCurrentBuildInfoPlugin = require('./plugins/output-build-info/index');
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    //使用自定义插件
    new CopyrightWebpackPlugin(),
    new OutputCurrentBuildInfoPlugin({
      outputName: 'build-log.json',
      dateFormatType: 'YYYY-MM-DD HH:mm:ss',
      buildType: 'local'
    }),
  ]
};