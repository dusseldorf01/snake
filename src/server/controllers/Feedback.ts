import type {
  Request,
  Response,
} from 'express';
import FeedbackService from '@/server/services/FeedbackService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import type { IFeedbackCreateModel } from '@/models/feedback';
import getPaginationParams from '@/utils/api/getPaginationParams';
import Users from '@/server/lib/Users';

export default class Feedback {
  public static create = (
    req: Request<any, any, IFeedbackCreateModel>,
    res: Response,
  ) => {
    const {
      message,
      title,
    } = req.body;

    const { user } = req;

    if (user === undefined || user === null) {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: responseErrorMessages.userNotFound(),
      });
      return;
    }

    const { id: userId } = user;

    if (!message || !title) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send({
        message: responseErrorMessages.required<IFeedbackCreateModel>(['message', 'title']),
      });
      return;
    }

    FeedbackService
      .create({
        message, title, userId,
      })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.custom('sending feedback'),
        });
      });
  };

  public static getAll = (req: Request, res: Response) => {
    const {
      limit,
      offset,
    } = getPaginationParams(req.query);

    FeedbackService
      .getAll({ limit, offset })
      .then((items) => {
        const users = new Users();

        items.forEach(({ userId }) => {
          users.add(userId);
        });

        return Promise
          .all(users.fetchRequests())
          .then((allUsers) => {
            const newItems = items.map(({
              id,
              title,
              message,
              createdAt,
              updatedAt,
              userId,
            }) => {
              const user = allUsers.find((u) => u.id === userId);

              const newItem = {
                id,
                title,
                message,
                createdAt,
                updatedAt,
                userId,
              };

              if (user !== undefined) {
                return {
                  ...newItem,
                  user,
                };
              }

              return newItem;
            });

            res.send({
              items: newItems,
              total: newItems.length,
            });
          });
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.getAll('feedback messages'),
        });
      });
  };
}
