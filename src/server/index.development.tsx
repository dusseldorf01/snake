/* eslint import/no-extraneous-dependencies: 0 */
import apiProxy from '@/server/apiProxy';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import spaHandler from '@/server/spaHandler';
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

app.use('/*', spaHandler);

app.listen(port, () => console.log(`listening on port ${port}!`));
