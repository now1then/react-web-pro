const webpack = require('webpack');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),

  ],
  optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {
        name: "commons",
        chunks: "initial",
        minChunks: 2
      }
    }
  }
}
});
