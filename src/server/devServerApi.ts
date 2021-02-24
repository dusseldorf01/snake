import express, {
  Express, NextFunction, Request, Response,
} from 'express';
import api, { DEFAULT_YANDEX_API_URL } from '@/utils/api';
import apiInternal from '@/utils/apiInternal';
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

export default (req: Request, _res: Response, next: NextFunction) => {
  api.defaults.headers.cookie = req.headers.cookie;
  api.defaults.baseURL = `http${req.secure ? 's' : ''}://${req.headers.host}${DEFAULT_YANDEX_API_URL}`;
  apiInternal.defaults.headers.cookie = req.headers.cookie;

  next();
};

app.use(router);

startApp(app, port);
