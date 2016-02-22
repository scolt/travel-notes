'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devServerConfig = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 8080,
    contentBase: path.resolve(__dirname, 'public'),
    getUrl: function () {
        return `webpack-dev-server/client?http://${process.env.IP}:${process.env.PORT}/`;
    }
}

const config = {
    entry: {
        app: [
            devServerConfig.getUrl(),
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
        extensions: ['', '.js', '.jsx', '.styl']
    },

    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!stylus')
            }
        ]
    },
    
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],

    devServer: devServerConfig
};

module.exports = config;
