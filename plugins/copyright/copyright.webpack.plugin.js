// plugin class
class CopyrightWebpackPlugin {
  constructor () {}
  apply(compiler) {
    // console.log('compiler: ', compiler);
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', 
      (compilation,cb) => {
        // console.log('compilation: ', compilation);
        compilation.assets['copyright.md'] = {
          source: function() {
            return 'written by zhulm';
          },
          size: function() {
            return 15;
          },
        }
        cb()
      }
    )
  }
}
module.exports = CopyrightWebpackPlugin;