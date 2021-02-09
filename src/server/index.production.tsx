/* eslint import/no-extraneous-dependencies: 0 */
import fs from 'fs';
// @ts-ignore
import path from 'path';
import apiProxy from '@/server/apiProxy';
import express from 'express';
import api from '@/utils/api';
import render from '@/server/render';

const PUBLIC_DIR = path.resolve(process.cwd(), 'dist/public');

const app = express();
const port = process.env.PORT || 3000;

apiProxy(app);

app.use('/', express.static(PUBLIC_DIR));
app.get(['*', '/'], async (req, res) => {
  api.defaults.headers.cookie = req.headers.cookie;
  const urlPath = `${PUBLIC_DIR}${req.originalUrl}`;
  if (fs.existsSync(urlPath) && !fs.lstatSync(urlPath).isDirectory()) {
    return res.sendFile(urlPath);
  }
  const html = await render(req.originalUrl);
  return res.status(200).send(html);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
