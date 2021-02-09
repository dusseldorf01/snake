/* eslint import/no-extraneous-dependencies: 0 */
import apiProxy from '@/server/apiProxy';
import express from 'express';
import api, { DEFAULT_API_URL } from '@/utils/api';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import render from '@/server/render';
import webpackConfig from '../../webpack.client.config';

const config = webpackConfig(undefined, { mode: 'development' });
// @ts-ignore
const compiler = webpack(config);
const app = express();
const port = process.env.PORT || 8080;

apiProxy(app);

app.use('/assets', express.static('dist/assets'));

app.use(webpackMiddleware(compiler, {}));
app.use(webpackHotMiddleware(compiler));

app.use('/*', async (req, res) => {
  api.defaults.headers.cookie = req.headers.cookie;
  api.defaults.baseURL = `http${req.secure ? 's' : ''}://${req.headers.host}${DEFAULT_API_URL}`;

  const html = await render(req.originalUrl);
  res.status(200).send(html);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
