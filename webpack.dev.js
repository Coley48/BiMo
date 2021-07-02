const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: '',
    },
    devServer: {
        port: 8080,
        // contentBase: 'src',
        // open: true,
        hot: true,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    optimization: {
        runtimeChunk: 'single'
    }

});