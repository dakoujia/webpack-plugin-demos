const path = require('path')
const config = require('./mock/config.js')

const CopyrightWebpackPlugin = require('./plugins/copyright/copyright.webpack.plugin')
const OutputCurrentBuildInfoPlugin = require('./plugins/output-build-info/index')
const MockWebpackPlugin = require('./plugins/mock-webpack-plugin/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    watch: true,
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        //使用自定义插件
        new CopyrightWebpackPlugin(),
        new OutputCurrentBuildInfoPlugin({
            outputName: 'build-log.json',
            dateFormatType: 'YYYY-MM-DD HH:mm:ss',
            buildType: 'local',
        }),
        new MockWebpackPlugin({
            config,
            port: 5000,
        }),
        // 内置插件
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
    ],
    devServer: {
        proxy: {
            '/api': 'http://localhost:5000',
        },
        port: 8000,
    },
}
