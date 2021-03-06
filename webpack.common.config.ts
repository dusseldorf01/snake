/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
// @ts-ignore
import { loadableTransformer } from 'loadable-ts-transformer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackArgs } from './webpack/types';

const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

const ASSETS_DIR = 'assets';

export default function getCommonWebpackConfig(_env:unknown, argv: WebpackArgs, PUBLIC_PATH: string = '') {
  const isProduction = argv.mode === 'production';

  return {
    devtool: isProduction ? undefined : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { modules: { localIdentName: '[local]--[hash:base64:5]' } } },
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
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        '@': path.resolve(process.cwd(), 'src/'),
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
      new MiniCssExtractPlugin({
        filename: `${PUBLIC_PATH}${ASSETS_DIR}/css/[name].[contenthash].css`,
      }),
      new CopyPlugin({
        patterns: [{
          from: 'public/favicon.ico',
          to: `${PUBLIC_PATH}favicon.ico`,
        }, {
          from: 'public/apple-touch-icon.png',
          to: `${PUBLIC_PATH}apple-touch-icon.png`,
        }, {
          from: 'public/icon.svg',
          to: `${PUBLIC_PATH}icon.svg`,
        }, {
          from: 'public/icon-192.png',
          to: `${PUBLIC_PATH}icon-192.png`,
        }, {
          from: 'public/icon-512.png',
          to: `${PUBLIC_PATH}icon-512.png`,
        }, {
          from: 'public/icon-192-maskable.png',
          to: `${PUBLIC_PATH}icon-192-maskable.png`,
        }, {
          from: 'public/icon-512-maskable.png',
          to: `${PUBLIC_PATH}icon-512-maskable.png`,
        }, {
          from: 'public/manifest.json',
          to: `${PUBLIC_PATH}manifest.json`,
        }, {
          from: 'public/robots.txt',
          to: `${PUBLIC_PATH}robots.txt`,
        }],
      }),
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
    ],
  };
}
