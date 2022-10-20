// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const fs = require("fs-extra");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const copyPublicFolder = () => {
  fs.copySync(
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "build"),
    {
      dereference: true,
      filter: (file) => file !== path.resolve(__dirname, "public/index.html"),
    }
  );
};

const config = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].js?[contenthash]",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    open: false,
    host: "localhost",
    port: 8080,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),

    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());

    copyPublicFolder();
  } else {
    config.mode = "development";
  }

  return config;
};
