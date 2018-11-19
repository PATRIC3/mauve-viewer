const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        'mauve-viewer': './entry.js',
        'app': ['./demo/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        library: 'MauveViewer',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/mauve-viewer.css',
                to: 'mauve-viewer.css'
            }
        ])
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        publicPath: '/dist/',
        port: 9000
    },
    performance: {
        hints: false // ignore app.js chunk for now
    }
};
