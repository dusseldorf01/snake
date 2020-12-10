//const path = require('path');
const miniCss = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
   // watch: true,
    module: {
        rules: [
            {
            test:/\.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader',
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js', '.json' ],
    },
    plugins: [
        new miniCss({
            filename: 'style.css',
        }),
    ]
}