import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import api, { DEFAULT_YANDEX_API_URL } from '@/utils/api';
import apiInternal from '@/utils/apiInternal';

export default (req: Request, _res: Response, next: NextFunction) => {
  api.defaults.headers.cookie = req.headers.cookie;
  api.defaults.baseURL = `http${req.secure ? 's' : ''}://${req.headers.host}${DEFAULT_YANDEX_API_URL}`;
  apiInternal.defaults.headers.cookie = req.headers.cookie;

  next();
};
