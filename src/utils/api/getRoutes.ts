import type {
  NextFunction,
  Response,
  Request,
  Router,
} from 'express';
import { INTERNAL_API_URL } from '@/utils/apiInternal';

type MiddlewareType = (req: Request, res: Response, next: NextFunction) => void;

export interface IRoute {
  handler: (req: Request<any, any, any, any, any>, res: Response) => void;
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  path: string;
}

const getRoutes = (
  router: Router,
  routes: IRoute[],
  middleware: MiddlewareType | MiddlewareType[] = [],
) => {
  routes.forEach(({
    handler,
    method,
    path,
  }) => {
    router[method](`${INTERNAL_API_URL.slice(0, -1)}${path}`, middleware, handler);
  });
};

export default getRoutes;
