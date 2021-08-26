const path = require('path')

const config = {
    '/api/json/data': {
        data: {
            result: 'mocked data',
        },
    },
    '/api/json/path': {
        path: path.join(__dirname, './json/result.json'),
    },
    '/api/mockjs/data': {
        data: {
            'result|10': '*',
        },
    },
    '/api/mockjs/path': {
        path: path.join(__dirname, './json/mockjs.json'),
    },
}

module.exports = config
