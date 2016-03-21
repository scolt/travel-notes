'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let NODE_ENV = process.env.NODE_ENV || 'development';
let isDev = NODE_ENV === 'development';

const devServerConfig = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 8080,
    contentBase: path.resolve(__dirname, 'public'),
    getUrl: function () {
        return `webpack-dev-server/client?http://${this.host}:${this.port}/`;
    }
};

let plugins = [new ExtractTextPlugin('styles.css')];
if (!isDev) plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

const config = {
    entry: {
        app:
            []
            .concat([path.resolve(__dirname, 'client/js/app.jsx')])
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },

    debug: isDev,
    cache: isDev,
    devtool: isDev ? 'eval-source-map' : null,
    watch: isDev,

    resolve: {
        root: [
            path.resolve(__dirname, 'client/js'),
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.jsx', '.styl']
    },

    eslint: {
        configFile: '.eslintrc.js'
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
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(otf|eot|svg|ttf|woff)\??/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?name=assets/[path][name].[ext]&limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },

    plugins: plugins,
    devServer: devServerConfig
};

module.exports = config;
