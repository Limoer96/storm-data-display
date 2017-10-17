const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');
module.exports = {
    entry: path.join(APP_PATH, 'index.js'),
    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        inline: true
    },
    module:{
        rules: [
            // 使用babel-loader来打包react代码
            {
                test: /\.jsx?$/,
                exclude: /(node_modules | bower_component)/,
                loader: require.resolve('babel-loader'),
                options: {
                    plugins: [
                        ['import', {libraryName: 'antd', style: 'css'}]
                    ],
                    cacheDirectory: true
                }
            },
            // 使用extract-text-webpack-plugin插件进行css的分离
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "css-loader",
            //         options: {
            //             modules: true
            //         }
            //     }
            // },
            // {
            //     test: /\.css$/,
            //     use: 'css-loader'
            // },
            // 使用file-loader加载图片
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
}