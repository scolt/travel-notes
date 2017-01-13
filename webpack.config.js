'use strict';

const path = require('path');
const webpack = require('webpack');

/* Extra plugins */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const definitions = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
});

const isDev = JSON.parse(definitions.definitions['process.env.NODE_ENV']) == 'development';

const replacements = [
    {
        pattern: /\$\$REST_URL_HOST/ig,
        replacement: () => process.env.remoteServer || (isDev ? 'http://localhost:1337' : '')
    }
];

const devServerConfig = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 8080,
    contentBase: path.resolve(__dirname, 'public'),
    getUrl: function () {
        return `webpack-dev-server/client?http://${this.host}:${this.port}/`;
    }
};

let plugins = [
    new ExtractTextPlugin('styles.css'),
    new StringReplacePlugin(),
    definitions
];
if (!isDev) plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

const config = {
    entry: {
        app:
            (isDev ? [devServerConfig.getUrl()] : [])
            .concat([path.resolve(__dirname, 'client/app.jsx')])
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
            path.resolve(__dirname, 'client'),
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
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: StringReplacePlugin.replace({
                    replacements: replacements
                })
            },
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
                test: /\.(png|jpg)\??/,
                loader: 'url?limit=100&name=images/[name].[ext]'
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|svg)\??/,
                loader: 'url?limit=100&name=fonts/[name].[ext]'
            }
        ]
    },

    plugins: plugins,
    devServer: devServerConfig
};

module.exports = config;
