var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: 'production',
    entry: './demo/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        publicPath: '/build/',
        port: 9000
    },
    performance: {
        hints: false
    }

};