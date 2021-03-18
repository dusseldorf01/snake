/* eslint import/no-extraneous-dependencies: 0 */
import apiProxy from '@/server/apiProxy';
import express from 'express';
import spaHandler from '@/server/spaHandler';

const app = express();
const port = process.env.PORT || 8080;

apiProxy(app);

app.get(['*', '/'], async (req, res) => spaHandler(req, res, port));

app.listen(port, () => console.log(`listening on port ${port}!`));
