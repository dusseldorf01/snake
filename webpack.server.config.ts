/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import dotenv from 'dotenv';
import NodeExternals from 'webpack-node-externals';
import webpack from 'webpack';
import { WebpackArgs } from './webpack/types';
import getCommonWebpackConfig from './webpack.common.config';

dotenv.config();

const PUBLIC_DIR = 'public/';
const ASSETS_DIR = 'assets';

export default function webpackConfig(_env:unknown, argv: WebpackArgs) {
  const commonConfig = getCommonWebpackConfig(_env, argv, PUBLIC_DIR);

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
      assetModuleFilename: `${PUBLIC_DIR}${ASSETS_DIR}/resources/[contenthash][ext][query]`,
    },
    module: commonConfig.module,
    resolve: commonConfig.resolve,
    optimization: commonConfig.optimization,
    plugins: [
      new webpack.DefinePlugin({
        IS_SERVER: true,
        WEBPACK_DEV_SERVER: false,
      }),
      ...commonConfig.plugins,
    ],
  };
}
