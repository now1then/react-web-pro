const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");

const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    port: 9000,
    hot: true,
    open: false,
    historyApiFallback: true,
    compress: true
    // publicPath: "/"
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "eval-source-map"
  // cache: true //缓存模块
  // optimization.
});
