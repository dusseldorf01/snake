/* eslint import/no-extraneous-dependencies: 0 */
import apiProxy from '@/server/apiProxy';
import express from 'express';
import spaHandler from '@/server/spaHandler';
import startApp from './startApp';
import router from './router';
import addApiParams from './middlewares/addApiParams';

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

apiProxy(app);

app.use('/*', (req, res, next) => addApiParams(req, res, next, port));

app.use(router);

app.get(['*', '/'], spaHandler);

startApp(app, port);
