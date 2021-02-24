import type {
  Request,
  Response,
} from 'express';
import LikesService from '@/server/services/LikesService';
import responseErrorMessages from '@/utils/api/responseMessages';
import RESPONSE_CODE from '@/server/responseCode';

export default class Likes {
  public static create = (req: Request<{ postId: number }>, res: Response) => {
    const { postId } = req.params;

    const { user } = req;

    if (user === undefined || user === null) {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: responseErrorMessages.userNotFound(),
      });
      return;
    }

    const { id } = user;

    LikesService
      .create({ postId, userId: id })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.custom('adding like'),
        });
      });
  };

  public static delete = (req: Request<{ postId: number }>, res: Response) => {
    const { postId } = req.params;

    const { user } = req;

    if (user === undefined || user === null) {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: responseErrorMessages.userNotFound(),
      });
      return;
    }

    const { id } = user;

    LikesService
      .delete({ postId, userId: id })
      .then((data) => {
        res.send({ count: data });
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.custom('deleting like'),
        });
      });
  };
}
