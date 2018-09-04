var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        app: ['./demo/main.js'],
        'mauve-viewer': ['./src/mauve-viewer.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        libraryTarget: 'umd'
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
    //externals: {
    //    d3: 'd3',
    //    axios: 'axios'
    //},
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        publicPath: '/dist/',
        port: 9000
    },
    performance: {
        hints: false
    }

};