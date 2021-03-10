import type {
  Request,
  Response,
} from 'express';
import {
  add as addLike,
  remove as removeLike,
} from '@/server/services/LikesService';
import responseErrorMessages from '@/utils/api/responseMessages';
import RESPONSE_CODE from '@/server/responseCode';

export const add = (req: Request<{ postId: number }>, res: Response) => {
  const { postId } = req.params;

  const { user } = req;

  if (user === undefined || user === null) {
    res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
      message: responseErrorMessages.userNotFound(),
    });
    return;
  }

  const { id } = user;

  // eslint-disable-next-line consistent-return
  return addLike({ postId, userId: id })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.custom('adding like'),
      });
    });
};

export const remove = (req: Request<{ postId: number }>, res: Response) => {
  const { postId } = req.params;

  const { user } = req;

  if (user === undefined || user === null) {
    res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
      message: responseErrorMessages.userNotFound(),
    });
    return;
  }

  const { id } = user;

  // eslint-disable-next-line consistent-return
  return removeLike({ postId, userId: id })
    .then((data) => {
      res.send({ count: data });
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.custom('deleting like'),
      });
    });
};
