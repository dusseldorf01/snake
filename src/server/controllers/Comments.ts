import type {
  Request,
  Response,
} from 'express';
import CommentsService from '@/server/services/CommentsService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import type {
  ICommentCreateBody,
  ICommentCreateModel,
} from '@/models/forum';

export default class Comments {
  public static create = (
    req: Request<{ postId: number }, any, ICommentCreateBody>,
    res: Response,
  ) => {
    const { postId } = req.params;

    const {
      parentId = null,
      text,
    } = req.body;

    const { user } = req;

    if (user === undefined || user === null) {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: responseErrorMessages.userNotFound(),
      });
      return;
    }

    const { id: userId } = user;

    if (!text) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send({
        message: responseErrorMessages.required<ICommentCreateModel>(['text']),
      });
      return;
    }

    CommentsService
      .create({
        postId, text, userId, parentId,
      })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.create('comment'),
        });
      });
  };
}