const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log(__dirname);
const srcDir = path.join(__dirname, "../src");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // context: path.resolve(__dirname, "../"),
  // entry: {main: 'src/main.js'},
  // entry: "../src/main.js",
  // devtool: ''
  entry: {
    main: path.join(__dirname, "../src/main.js")
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[chunkhash:8].js",
    // publicPath: "/",
    chunkFilename: "chunk/[name].[chunkhash:8].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [srcDir],
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader?cacheDirectory=true"
      },
      {
        test: /\.less$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        include: [srcDir]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        include: [srcDir]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        include: [srcDir]
      }
    ]
  },
  resolve: {
    alias: {
      "@": srcDir,
      "@pages": `${srcDir}/pages`
    }
  }
  // optimization: {
  //   removeAvailableModules: true, // 删除已解决的chunk (默认 true)
  //   removeEmptyChunks: true, // 删除空的chunks (默认 true)
  //   mergeDuplicateChunks: true // 合并重复的chunk (默认 true)
  // }
};
