const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const { environment, projectPath } = require("./utils/constant");
const entry = require("./utils/entry");

const relativeOutputPath = projectPath.relativeOutputPath;

module.exports = env => {
    env = environment[env] || environment.development;
    const isDevBuild = !(env === environment.production);

    const sharedConfig = () => ({
        mode: env,
        stats: { modules: false },
        resolve: { extensions: [".js", ".jsx"] },
        output: {
            path: projectPath.rootPath,
            filename: "[name].js"
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 4096,
                        name: "[name].[ext]",
                        outputPath: relativeOutputPath + "/style/assets/",
                        publicPath: "assets/"
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
                        outputPath: relativeOutputPath
                    }
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: true
                    }
                }]
            }]
        },
        node: {
            fs: 'empty'
        },
        externals: [
            { './jszip': 'jszip' },
            { './ods': 'ods' },
            { './cptable': 'var cptable' }
        ]
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleConfig = merge(sharedConfig(), {
        entry: entry,
        module: {
            rules: [{
                test: /\.s?[ac]ss$/,
                use: [{
                    loader: 'style-loader',
                },
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: 'css-loader',
                }, {
                    loader: 'resolve-url-loader',
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        sourceMapContents: false
                    }
                }]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
            new CopyPlugin([
                { from: 'src/styles/fonts', to: 'build/styles/fonts' },
                { from: 'src/styles/images', to: 'build/styles/images' },
                { from: 'src/styles/assets', to: 'build/styles/assets' },
            ]),
        ].concat(isDevBuild ? [] : [new OptimizeCSSAssetsPlugin(), new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['build'] }),]),
        devtool: isDevBuild ? "source-map" : undefined
    });

    return [clientBundleConfig];
};