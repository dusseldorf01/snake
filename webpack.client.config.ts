/* eslint import/no-extraneous-dependencies: 0 */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import webpack from 'webpack';
import { WebpackArgs, WebpackEnv } from './webpack/types';
import getCommonWebpackConfig from './webpack.common.config';

dotenv.config();

const ASSETS_DIR = 'assets';

export default function webpackConfig(_env:WebpackEnv, argv: WebpackArgs) {
  const isProduction = argv.mode === 'production';
  const commonConfig = getCommonWebpackConfig(_env, argv);
  const https = process.env.HTTPS === 'true';
  const isDevServer = !!(_env && _env.WEBPACK_SERVE);

  const config = {
    mode: argv.mode || 'development',
    entry: {
      client: isProduction || isDevServer ? './src/index.tsx' : [
        'webpack-hot-middleware/client',
        './src/index.tsx',
      ],
    },
    output: {
      path: path.resolve(process.cwd(), 'dist/public'),
      filename: `${ASSETS_DIR}/js/[name].[contenthash].js`,
      publicPath: '/',
    },
    module: {
      ...commonConfig.module,
      rules: [
        ...commonConfig.module.rules,
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico|woff|woff2|ttf)$/,
          loader: 'file-loader',
          options: {
            name: `${ASSETS_DIR}/resources/[contenthash].[ext]`,
          },
        },
      ],
    },
    resolve: commonConfig.resolve,
    optimization: commonConfig.optimization,
    plugins: [
      new webpack.DefinePlugin({
        IS_SERVER: false,
        WEBPACK_DEV_SERVER: isDevServer,
      }),
      ...commonConfig.plugins,
      new LoadablePlugin({
        writeToDisk: true,
        filename: '../stats.json',
      }),
    ],
    devServer: {
      hot: true,
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: process.env.DEVSERVER_PORT || 8080,
      https,
      key: https ? fs.readFileSync('./ssl/localhost+2-key.pem') : undefined,
      cert: https ? fs.readFileSync('./ssl/localhost+2.pem') : undefined,
    },
  };

  if (!isProduction) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (!isDevServer) {
    config.plugins.push(new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/serviceWorkers/index.ts',
      swDest: 'sw.js',
      maximumFileSizeToCacheInBytes: isProduction ? undefined : 2700000,
      compileSrc: true,
    }));
  } else {
    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }));
  }

  return config;
}
