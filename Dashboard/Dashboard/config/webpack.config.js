const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
            filename: "[name].js",
            chunkFilename: 'build/js/build/vendors/[name].chunk.js',
            publicPath: "/"
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    react: {
                        name: 'react',
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        chunks: 'initial'
                    },
                    moment: {
                        name: 'moment',
                        test: /[\\/]node_modules[\\/](moment)[\\/]/,
                        chunks: 'initial'
                    }
                }
            }
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
                        outputPath: relativeOutputPath + "/css/build/fonts/",
                        publicPath: "fonts/"
                    }
                }]
            }]
        },
        node: {
            fs: 'empty'
        }
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
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            //new CopyPlugin([
            //    { from: 'src/styles/fonts', to: 'build/css/build/fonts' },
            //    { from: 'src/styles/images', to: 'build/css/build/images' },
            //    { from: 'src/styles/assets', to: 'build/css/build/assets' },
            //]),
            new BundleAnalyzerPlugin()
        ].concat(isDevBuild ? [] : [new OptimizeCSSAssetsPlugin(), new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["build/**/*.*"] }),]),
        devtool: isDevBuild ? "source-map" : undefined
    });

    return [clientBundleConfig];
};