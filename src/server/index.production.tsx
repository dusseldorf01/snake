/* eslint import/no-extraneous-dependencies: 0 */
import fs from 'fs';
import path from 'path';
import apiProxy from '@/server/apiProxy';
import express from 'express';
import spaHandler from '@/server/spaHandler';

const PUBLIC_DIR = path.resolve(process.cwd(), 'dist/public');

const app = express();
const port = process.env.PORT || 8080;

apiProxy(app);

app.use('/', express.static(PUBLIC_DIR));
app.get(['*', '/'], async (req, res) => {
  const urlPath = `${PUBLIC_DIR}${req.originalUrl}`;
  if (fs.existsSync(urlPath) && !fs.lstatSync(urlPath).isDirectory()) {
    return res.sendFile(urlPath);
  }

  return spaHandler(req, res);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
