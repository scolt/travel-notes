'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const definitions = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
});

const NODE_ENV = JSON.parse(definitions.definitions['process.env.NODE_ENV']);
const isDev = NODE_ENV == 'development';
const remoteServer = process.env.remoteServer || 'http://localhost:1337';

const devServerConfig = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 8080,
    contentBase: path.resolve(__dirname, 'public'),
    getUrl: function () {
        return `webpack-dev-server/client?http://${this.host}:${this.port}/`;
    },

    proxy: {
        '/restApi/*': {
            target: remoteServer,
            secure: false,
            changeOrigin: true
        }
    }
};

let plugins = [new ExtractTextPlugin('styles.css'), definitions];
if (!isDev) plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

const config = {
    entry: {
        app:
            (isDev ? [devServerConfig.getUrl()] : [])
            .concat([path.resolve(__dirname, 'client/js/app.jsx')])
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },

    debug: isDev,
    cache: isDev,
    devtool: isDev ? 'eval-source-map' : null,
    watch: isDev,

    resolve: {
        root: [
            path.resolve(__dirname, 'client/js'),
            path.resolve(__dirname, 'client/assets'),
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
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /favicon\.png\??/,
                loader: 'url?limit=1&name=[path][name].[ext]'
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|png|jpg)\??/,
                loader: 'url?limit=20000&name=[path][name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&name=[path][name].[ext]'
            }
        ]
    },

    plugins: plugins,
    devServer: devServerConfig
};

module.exports = config;
