/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import dotenv from 'dotenv';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import webpack from 'webpack';
import { WebpackArgs } from './webpack/types';
import getCommonWebpackConfig from './webpack.common.config';

dotenv.config();

const ASSETS_DIR = 'assets';

export default function webpackConfig(_env:unknown, argv: WebpackArgs) {
  const isProduction = argv.mode === 'production';
  const commonConfig = getCommonWebpackConfig(_env, argv);

  const config = {
    mode: argv.mode || 'development',
    entry: {
      client: isProduction ? './src/index.tsx' : [
        'webpack-hot-middleware/client',
        './src/index.tsx',
      ],
    },
    output: {
      path: path.resolve(process.cwd(), 'dist/public'),
      filename: `${ASSETS_DIR}/js/[name].[contenthash].js`,
      publicPath: '/',
      assetModuleFilename: `${ASSETS_DIR}/resources/[contenthash][ext][query]`,
    },
    module: commonConfig.module,
    resolve: commonConfig.resolve,
    optimization: commonConfig.optimization,
    plugins: [
      new webpack.DefinePlugin({
        IS_SERVER: false,
      }),
      ...commonConfig.plugins,
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/serviceWorkers/index.ts',
        swDest: 'sw.js',
        maximumFileSizeToCacheInBytes: isProduction ? undefined : 2700000,
        compileSrc: true,
      }),
      new LoadablePlugin({
        writeToDisk: true,
        filename: '../stats.json',
      }),
    ],
  };

  if (!isProduction) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
}
