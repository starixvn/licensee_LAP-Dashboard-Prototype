const path = require("path");

module.exports = function(release) {
    return {
        mode: release ? 'production' : 'development',
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: '[name].js'
        },
        devtool: release ? false : 'source-map',
        entry: {
            'js/app': './src/App.jsx'
        },

        resolve: {
            extensions: ['.js', '.jsx']
        },

        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /(node_modules|bower_components)/
            }]
        }
    };
};