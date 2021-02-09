/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import dotenv from 'dotenv';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
// @ts-ignore
import { loadableTransformer } from 'loadable-ts-transformer';
import webpack from 'webpack';
import { WebpackArgs } from './webpack/types';

dotenv.config();

const ASSETS_DIR = 'assets';

export default function webpackConfig(_env:unknown, argv: WebpackArgs) {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: {
      client: [
        !isProduction && 'webpack-hot-middleware/client',
        './src/index.tsx',
      ],
    },
    output: {
      path: path.resolve(process.cwd(), 'dist/public'),
      filename: `${ASSETS_DIR}/js/[name].[contenthash].js`,
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
      new webpack.DefinePlugin({
        IS_SERVER: false,
      }),
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
      new CopyPlugin({
        patterns: [{
          from: 'public/favicon.ico',
          to: 'favicon.ico',
        }],
      }),
      new LoadablePlugin({
        writeToDisk: true,
        filename: '../stats.json',
      }),
      !isProduction && new webpack.HotModuleReplacementPlugin(),
    ],
  };
}
