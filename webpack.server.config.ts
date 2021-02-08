/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import dotenv from 'dotenv';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import NodeExternals from 'webpack-node-externals';
// @ts-ignore
import { loadableTransformer } from 'loadable-ts-transformer';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { WebpackArgs } from './webpack/types';

dotenv.config();

const ASSETS_DIR = 'assets';

export default function webpackConfig(_env:unknown, argv: WebpackArgs) {
  const isProduction = argv.mode === 'production';

  return {
    target: 'node',
    externals: [NodeExternals()],
    mode: argv.mode || 'development',
    entry: {
      server: [
        `./src/server/index.${argv.mode}.tsx`,
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/',
      assetModuleFilename: `${ASSETS_DIR}/resources/[contenthash][ext][query]`,
    },
    devtool: isProduction ? undefined : 'inline-source-map',
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
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            getCustomTransformers: () => ({ before: [loadableTransformer] }),
          },
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
      new webpack.DefinePlugin({
        IS_SERVER: true,
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `public/${ASSETS_DIR}/css/[name].[contenthash].css`,
      }),
      new CopyPlugin({
        patterns: [{
          from: 'public/favicon.ico',
          to: 'favicon.ico',
        }],
      }),
    ],
  };
}
