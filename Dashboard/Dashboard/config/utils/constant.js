const path = require("path");

module.exports = {
    environment: {
        development: 'development',
        production: 'production'
    },
    projectPath: {
        rootPath: path.resolve(__dirname, '../../'),
        clientInputPath: path.resolve(__dirname, '../../src'),
        clientOutputPath: path.resolve(__dirname, '../../build'),
        otherRoot: path.resolve(__dirname, '../../config/utils'),
        relativeOutputPath: 'build'
    }
}