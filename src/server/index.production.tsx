/* eslint import/no-extraneous-dependencies: 0 */
import fs from 'fs';
// @ts-ignore
import path from 'path';
import apiProxy from '@/server/apiProxy';
import express from 'express';
import spaHandler from '@/server/spaHandler';
import startApp from './startApp';
import router from './router';
import addApiParams from './middlewares/addApiParams';

const bodyParser = require('body-parser');

const PUBLIC_DIR = path.resolve(process.cwd(), 'dist/public');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

apiProxy(app);

app.use('/', express.static(PUBLIC_DIR));

app.use('/*', addApiParams);

app.use(router);

app.get(['*', '/'], async (req, res) => {
  const urlPath = `${PUBLIC_DIR}${req.originalUrl}`;
  if (fs.existsSync(urlPath) && !fs.lstatSync(urlPath).isDirectory()) {
    return res.sendFile(urlPath);
  }

  return spaHandler(req, res);
});

startApp(app, port);
