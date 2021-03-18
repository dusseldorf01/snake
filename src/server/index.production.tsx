/* eslint import/no-extraneous-dependencies: 0 */
import apiProxy from '@/server/apiProxy';
import express from 'express';
import spaHandler from '@/server/spaHandler';
import path from 'path';
import startApp from './startApp';
import router from './router';

const bodyParser = require('body-parser');

const PUBLIC_DIR = path.resolve(process.cwd(), 'dist/public');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

apiProxy(app);

app.use('/', express.static(PUBLIC_DIR));

app.use(router);

app.get(['*', '/'], async (req, res) => spaHandler(req, res, port));

startApp(app, port);
