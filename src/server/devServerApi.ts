import express, { Express } from 'express';
import startApp from './startApp';
import router from './router';
import apiProxy from './apiProxy';
import addApiParams from './middlewares/addApiParams';

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

const app: Express = express();

const port = 8081;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

apiProxy(app);

app.use('/*', addApiParams);

app.use(router);

startApp(app, port);
