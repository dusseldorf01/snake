require('dotenv').config();
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const public = 'public';
const ASSETS_DIR = 'assets';

module.exports = function (env, argv) {
  const isProduction = argv.mode === 'production';
  const https = process.env.HTTPS === 'true';

  return {
    mode: argv.mode || 'development',
    entry: {
      main: [
        'webpack-hot-middleware/client',
        './src/index.tsx',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${ASSETS_DIR}/js/[name].[contenthash].js`,
      publicPath: '/',
      assetModuleFilename: `${ASSETS_DIR}/resources/[hash][ext][query]`,
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, public),
      compress: true,
      port: process.env.DEVSERVER_PORT || 8080,
      https,
      key: https ? fs.readFileSync('./ssl/localhost+2-key.pem') : undefined,
      cert: https ? fs.readFileSync('./ssl/localhost+2.pem') : undefined,
    },
    devtool: isProduction ? false : 'inline-source-map',
    // watch: true,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { modules: true } },
            'postcss-loader',
          ],
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
        {
          test: /\.tsx?$/i,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico|woff|woff2|ttf)$/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 1,
        maxSize: 270000,
        minChunks: 2,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name: 'vendor',
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/serviceWorkers/index.ts',
        swDest: 'sw.js',
        maximumFileSizeToCacheInBytes: isProduction ? undefined : 2700000,
        compileSrc: true,
      }),
      new MiniCssExtractPlugin({
        filename: `${ASSETS_DIR}/css/[name].[contenthash].css`,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: `${public}/index.html`,
      }),
      new CopyPlugin({
        patterns: [{
          from: 'public/favicon.ico',
          to: 'favicon.ico',
        }],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};
