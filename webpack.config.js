const path    = require('path');
const miniCss = require('mini-css-extract-plugin');
const public  = 'public';

module.exports = {
    entry: {
        main: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, `${public}/dist` ),
        filename: '[name].min.js'
    },
    devServer: {
        contentBase: path.join(__dirname, public ),
        compress: true,
        port: 8080
    },
    devtool: 'inline-source-map',
   // watch: true,
    module: {
        rules: [
            {
            test:/\.css$/i,
            use: [
                miniCss.loader,
                'css-loader',
                'postcss-loader',
                ]
            },
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.tsx?$/i,
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
            filename: 'style.min.css',
        }),
    ]
}
