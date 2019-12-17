const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const { environment, projectPath } = require("./utils/constant");
const entry = require("./utils/entry");

module.exports = env => {
  env = environment[env] || environment.development;
  const isDevBuild = !(env === environment.production);
  const sharedConfig = () => ({
    mode: env,
    stats: { modules: false },
    resolve: { extensions: [".js", ".jsx"] },
    output: {
      path: projectPath.rootPath + '/build/',
      filename: "[name].js",
      chunkFilename: 'js/pages/analytics/[name].chunk.js',
      publicPath: ""
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'common/vendor',
            test: /node_modules/,
            chunks: 'all',
           },
          default: {
            name: 'common/default',
            minChunks: 2,
            reuseExistingChunk: true
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
            outputPath: "css/pages/analytics/fonts/",
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
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify(env)
      }}),
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: 'css/pages/analytics/[name].css',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new BundleAnalyzerPlugin()
    ].concat(isDevBuild ? [] : [new OptimizeCSSAssetsPlugin(), new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["js/**/*.*", "css/**/*.*"] }),]),
    devtool: isDevBuild ? "source-map" : undefined
  });

  return [clientBundleConfig];
};
