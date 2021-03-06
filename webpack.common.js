const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        // filename: '[name].[chunkhash].bundle.js',
        filename: 'js/[name].[hash:8].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        pathinfo: false,
    },
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            "@": path.resolve(__dirname, './src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8096,
                        name: '[contenthash:8].[ext]',
                        outputPath: 'img',
                        esModule: false,
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[contenthash:8].[ext]',
                            outputPath: 'font'
                        }
                    }

                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            favicon: './src/assets/img/favicon.ico',
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        // moduleIds: 'hashed',
        splitChunks: {
            minSize: 30,
            cacheGroups: {
                default: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: -20
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10
                }
            }
        }
    }
}