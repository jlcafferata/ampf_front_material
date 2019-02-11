var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/frontend/public');
var APP_DIR = path.resolve(__dirname, 'src/frontend/app');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: APP_DIR + '/index.html',
    filename: 'index.html',
    inject: 'body'
  });



var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'        
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                }
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig],
    devServer: {
        host: '192.168.0.162',
        port: 3000,
        historyApiFallback: true       
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://192.168.0.17:8080'
        })
    }
}

export default config;