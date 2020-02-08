/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: "eval",
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true,
    host: "0.0.0.0"
  }
});
