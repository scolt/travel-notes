'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            'client/js/**/*-spec.js',
            'client/js/**/*-spec.jsx'
        ],
        frameworks: ['jasmine', 'es6-shim'],
        preprocessors: {
            'client/js/**/*-spec.js': ['webpack'],
            'client/js/**/*-spec.jsx': ['webpack']
        },
        reporters: ['dots'],
        singleRun: false,
        webpack: {
            resolve: {
                root: [
                    path.resolve(__dirname, 'client/js'),
                    path.resolve(__dirname, 'node_modules')
                ],
                extensions: ['', '.js', '.jsx']
            },
            module: {
                loaders: [
                    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
                ]
            },
            watch: true
        },
        webpackMiddleware: {
            noInfo: true
        }
    });
};
