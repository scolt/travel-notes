'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080/',
            path.resolve(__dirname, 'client/js/app.jsx')
        ]
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },

    devtool: 'eval',
    watch: true,

    resolve: {
        root: [
            path.resolve(__dirname, 'client/js'),
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },

    devServer: {
        host: process.env.IP || 'localhost',
        port: process.env.PORT || 8080,
        contentBase: path.resolve(__dirname, 'public')
    }
};