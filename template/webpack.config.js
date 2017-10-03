'use strict';
const {
    resolve
} = require('path');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    entry: {
        'demo': [
            'react-hot-loader/patch',
            './example/index.js'
        ]
    },
    output: {
        filename: '[name]-[hash].js',
        sourceMapFilename: '[file]-[hash].map',
        path: resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: [path.join(__dirname,'demo'), path.join(__dirname, 'dist')],
        overlay: true,
        port: {{port}},
        host: '0.0.0.0',
        hot: true,
        publicPath: '/dist/',
        headers: {
            'XM-Component-Server': 'webpack-dev-server@2.0.0'
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/.*$/,
                    to: '/dist/index.html'
                }
            ],
            verbose: true
        },
        watchContentBase: true
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[{
                    loader:'react-hot-loader/webpack'
                },{{#if babelEnv}}
                    {
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            ["env", {
                                "targets": {
                                    "browsers": ["last 1 Chrome versions"]
                                    // "chrome": 59
                                },
                                 "modules": false,
                                // "loose": true
                            }], 'react'
                        ],
                        
                        'env': {},
                        'ignore': [
                            'node_modules/**',
                            'dist'
                        ],
                        'plugins': [
                            'transform-class-properties'
                        ]
                    }
                }
                {{else}}
                    {
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            ['es2015', {
                                'modules': false
                            }], 'stage-0', 'react'
                        ],
                        'env': {},
                        'ignore': [
                            'node_modules/**',
                            'dist'
                        ],
                        'plugins': [
                            'react-hot-loader/babel',
                            'transform-decorators-legacy'
                        ]
                    }
                }
                {{/if}}
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/i,
                use: ['url-loader']
            }
        ]
    },
    externals: {
        jquery: 'jQuery',
        lodash: '_'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title:'test',
            template:"example/tpl.ejs",
            inject:false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),{{#webpackDll}}
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, "demo", "dll"),
            context: __dirname,
            manifest: require("./demo/dll/manifest.json")
        }),{{/webpackDll}}
        new FriendlyErrorsPlugin()
        ]
};
