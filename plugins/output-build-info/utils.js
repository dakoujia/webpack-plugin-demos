const git = require('simple-git/promise')();

const {ERROR} = require('./enum');
const {Warn} = require('./log');

// equal
const isEqual = (messageA, messageB) => {
    return messageA.toString().trim() === messageB.toString().trim()
};

// git repository
const checkIsGitRepository = async () => {
    try {
        await git.status();
    } catch (e) {
        const errorMessage = e.message.toString();
        Warn(errorMessage);
        return isEqual(ERROR.NOT_GIT_REPOSITORY, errorMessage)
    }
};

// git branch
const getLocalCurrentBranch = async () => {
    try {
        const currentBranch = await git.branchLocal();
        return currentBranch.current || '';
    } catch (e) {
        const errorMessage = e.message.toString();
        Warn(errorMessage);
    }
};

// git commit
const getLocalGitLatestCommit = async () => {
    try {
        const log = await git.log();
        return log.latest || {};
    } catch (e) {
        const errorMessage = e.message.toString();
        Warn(errorMessage);
    }
};

// git user info
const getLocalGitUserInfo = async () => {
    try {
        const listConfig = await git.listConfig();
        const configFileList = Array.from(listConfig.files).reverse();

        let userInfo = {};
        configFileList.forEach(item => {
            const currentConfig = listConfig.values[item];
            const name = currentConfig['user.name'];
            const email = currentConfig['user.email'];
            if (name && email) {
                userInfo = {
                    name: name,
                    email: email
                };
                return false;
            }
        });
        return userInfo;
    } catch (e) {
        const errorMessage = e.message.toString();
        Warn(errorMessage);
    }
};

module.exports = {
    checkIsGitRepository,
    getLocalCurrentBranch,
    getLocalGitLatestCommit,
    getLocalGitUserInfo,
};