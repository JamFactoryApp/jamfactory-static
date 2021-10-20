const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require("fs");

let htmlPageNames = [];
const pages = fs.readdirSync('./src')
pages.forEach(page => {
    if (page.endsWith('.html')) {
        htmlPageNames.push(page.split('.html')[0])
    }
})
let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/${name}.html`,
        filename: `${name}.html`,
        title: "JamFactory",
        favicon: "./src/assets/favicon.ico",
        chunks: ['main']
    })
});

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ].concat(multipleHtmlPlugins),
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        watchFiles: ['src/**/*'],
        headers: {
            "Access-Control-Allow-Origin": "localhost",
        },
        proxy: {
            '/jam/**': {
                target: 'http://localhost:4200',
                secure: false,
                changeOrigin: true,
            },
            '/api/v1/**': {
                target: 'http://localhost:3000/api/v1',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api/v1': '' },
            }
        },
    },

};