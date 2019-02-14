var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, "src/public");
var APP_DIR = path.resolve(__dirname, "src");

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: APP_DIR + "/index.html",
  filename: "index.html",
  inject: "body"
});

var config = {
  entry: APP_DIR + "/index.jsx",
  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-3"]
        }
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.(png|jp?g|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    host: "127.0.0.1",
    port: 3000,
    historyApiFallback: true
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      //apiUrl: "http://192.168.0.17:8080"
      apiUrl: "http://34.230.28.215"
    })
  }
};

module.exports = config;
