const {
    checkIsGitRepository,
    getLocalGitLatestCommit,
    getLocalGitUserInfo,
    getLocalCurrentBranch
} = require('./utils');
const moment = require('moment');

// plugin
class OutputCurrentBuildInfoPlugin {
  constructor(options = {}) {
    this.outputName = options.outputName || 'build-log.json';
    this.dateFormatType = options.dateFormatType || 'YYYY-MM-DD HH:mm:ss';
    this.buildType = options.buildType || 'local';
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('OutputCurrentBuildInfoPlugin', async (compilation, callback) =>{
      let isGitRepository = true;
       let output = {
          build_time: moment(new Date()).format(this.dateFormatType),
          build_type: this.buildType
      };
      try {
        await checkIsGitRepository();
      } catch (error) {
        isGitRepository = false;
      } finally {
        if(isGitRepository) {
          output.git = {
            last_commit: await getLocalGitLatestCommit(),
            currentBranch: await getLocalCurrentBranch(),
            build_user: await getLocalGitUserInfo(),
          }
        }
        compilation.assets[this.outputName] = {
          source() {
            return JSON.stringify(output);
          },
          size() {
            return 12;
          }
        }
      }
      callback();
    });
  }
}

module.exports = OutputCurrentBuildInfoPlugin;