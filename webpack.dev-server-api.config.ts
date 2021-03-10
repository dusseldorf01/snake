/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import dotenv from 'dotenv';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import NodeExternals from 'webpack-node-externals';
// @ts-ignore
import { loadableTransformer } from 'loadable-ts-transformer';
import webpack from 'webpack';

dotenv.config();

export default () => ({
  target: 'node',
  externals: [NodeExternals()],
  mode: 'development',
  entry: './src/server/devServerApi.ts',
  output: {
    path: path.resolve(__dirname, 'dist/dev-server-api'),
    filename: 'server.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: () => ({ before: [loadableTransformer] }),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      WEBPACK_DEV_SERVER: true,
    }),
  ],
});
