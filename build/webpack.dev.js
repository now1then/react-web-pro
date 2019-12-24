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
    compress: true,
    proxy: {
      "/testapi": {
        target:
          "https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/testapi": "" }
      }
      // "/test1": {
      //   target: "../mock/",
      //   pathRewrite: { "^/test1": "" }
      // }
    }
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
