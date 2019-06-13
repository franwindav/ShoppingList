const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Alias = require("./webpack.alias");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../public")
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    index: `${PATHS.src}/js`
  },
  output: {
    filename: "js/[name].js",
    path: PATHS.dist,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(le|sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.NODE_ENV === "development" }
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./config/postcss.config.js" }
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },
  resolve: {
    alias: Alias,
    extensions: [".js", ".jsx", ".less"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css"
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: "./index.html"
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `./img` },
      { from: `${PATHS.src}/static`, to: "./static" }
    ])
  ]
};
