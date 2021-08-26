const server = require('./server.js')

class MockWebpackPlugin {
    constructor({ config, port = 3000 }) {
        this.config = config
        this.port = port
    }
    apply(compiler) {
        server({ config: this.config, port: this.port })
        // 注册一个webpack插件
        compiler.plugin('emit', (compilation, callback) => {
            callback()
        })
    }
}

module.exports = MockWebpackPlugin
