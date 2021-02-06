/* eslint import/no-extraneous-dependencies: 0 */
const proxy = require('express-http-proxy');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig(undefined, { mode: 'development', hot: true }));
const app = express();
const port = process.env.PORT || 3000;

app.use('/api', proxy('https://ya-praktikum.tech', {
  proxyReqPathResolver(req) {
    return new Promise((resolve) => {
      resolve(`/api${req.url}`);
    });
  },
  userResDecorator(proxyRes, proxyResData, userReq, userRes) {
    userRes.header(
      'set-cookie',
      (userRes.getHeaders()['set-cookie'] || []).map((item) => {
        const cookie = item
          .split('; ')
          .map((part) => {
            const parts = part.split('=');
            return { name: parts[0], value: parts[1] };
          }).filter((part) => !['Domain', 'Secure', 'SameSite'].includes(part.name));

        return cookie.map((part) => `${part.name}${part.value ? `=${part.value}` : ''}`).join('; ');
      }),
    );

    return proxyResData;
  },
}));

app.use('/assets', express.static('dist/assets'));

app.use((req, res, next) => {
  if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
    req.url = '/'; // this would make express-js serve index.html
  }
  next();
});

app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.listen(port, () => console.log(`listening on port ${port}!`));
