import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import api, { DEFAULT_API_URL } from '@/utils/api';
import apiInternal from '@/utils/apiInternal';

export default (req: Request, _res: Response, next: NextFunction, port: string | number) => {
  api.defaults.headers.cookie = req.headers.cookie;
  api.defaults.baseURL = `http://localhost:${port}${DEFAULT_API_URL}`;
  apiInternal.defaults.headers.cookie = req.headers.cookie;
  apiInternal.defaults.baseURL = `http://localhost:${port}/api`;

  next();
};
