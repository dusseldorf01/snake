/* eslint import/no-extraneous-dependencies: 0 */
import apiProxy from '@/server/apiProxy';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import spaHandler from '@/server/spaHandler';
import startApp from './startApp';
import webpackConfig from '../../webpack.client.config';
import router from './router';
import addApiParams from './middlewares/addApiParams';

const bodyParser = require('body-parser');

const config = webpackConfig(undefined, { mode: 'development' });
// @ts-ignore
const compiler = webpack(config);
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

apiProxy(app);

app.use('/assets', express.static('dist/assets'));

app.use(webpackMiddleware(compiler, {}));
app.use(webpackHotMiddleware(compiler));

app.use('/*', (req, res, next) => addApiParams(req, res, next, port));

app.use(router);

app.use('/*', spaHandler);

startApp(app, port);
