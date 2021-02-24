import type {
  NextFunction,
  Response,
  Request,
} from 'express';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import { getUserInfo } from '@/api/auth';

export default (req: Request, res: Response, next: NextFunction) => {
  getUserInfo()
    .then((response) => {
      req.user = response.data;
      next();
    })
    .catch((error) => {
      if (error.response.status === RESPONSE_CODE.UNAUTHORIZED) {
        res
          .status(RESPONSE_CODE.UNAUTHORIZED)
          .send({ message: responseErrorMessages.cookieIsNotValid() });
      } else {
        res
          .status(RESPONSE_CODE.INTERNAL_ERROR)
          .send({ message: error.message || responseErrorMessages.authentication() });
      }
    });
};
