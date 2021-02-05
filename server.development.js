/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const fs = require('fs');
const proxy = require('express-http-proxy');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

process.env.NODE_ENV = 'development';

const compiler = webpack(webpackConfig(undefined, { mode: 'development', hot: true }));
const app = express();
const port = process.env.PORT || 3000;

app.use('/api', proxy('https://ya-praktikum.tech'));

app.use('/assets', express.static('dist/assets'));

app.use((req, res, next) => {
  if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
    req.url = '/'; // this would make express-js serve index.html
  }
  next();
});

app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

// app.get('/:file', (req, res) => {
//   let file = `${publicDir}/${req.params.file}`;
//   if (!fs.existsSync(file)) {
//     file = homeFile;
//   }
//   return res.sendFile(file);
// });

// app.get('/', (req, res) => {
//   res.sendFile(homeFile);
// });

app.listen(port, () => console.log(`listening on port ${port}!`));
