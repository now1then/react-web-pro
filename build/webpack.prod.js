const webpack = require("webpack");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./webpack.common");

const config = merge(commonConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "chunk/[id].[contenthash:8].css"
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // }
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 800000
  },
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      cacheGroups: {
        dll: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|babel-polyfill|mobx|mobx-react|mobx-react-dom|antd|@ant-design)/,
          minChunks: 1,
          priority: 2,
          name: "dll"
        },
        codeMirror: {
          test: /[\\/]node_modules[\\/](react-codemirror|codemirror)/,
          minChunks: 1,
          priority: 2,
          name: "codemirror"
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: 1,
          name: "vendors"
        }
      }
    }
  }
});

if (process.env.npm_lifecycle_event == "build:watch") {
  config = merge(config, {
    devtool: "cheap-source-map"
  });
}
if (process.env.npm_lifecycle_event === "build:report") {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
