const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const public = 'public';

module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    assetModuleFilename: '[name].[hash][ext]',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, public),
    compress: true,
    port: 8080,
  },
  devtool: 'inline-source-map',
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
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
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
  ],
};
