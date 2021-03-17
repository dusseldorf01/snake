import type {
  Request,
  Response,
} from 'express';
import {
  create as createFeedback,
  getAll as getAllFeedback,
} from '@/server/services/FeedbackService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import type { IFeedbackCreateModel } from '@/models/feedback';
import getPaginationParams from '@/utils/api/getPaginationParams';
import Users from '@/server/lib/Users';
import type { IFeedback } from '@/server/models/Feedback/interfaces';
import type { IUser } from '@/models/user';

export const create = (
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

  // eslint-disable-next-line consistent-return
  return createFeedback({
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

export const getAll = (req: Request, res: Response) => {
  const {
    limit,
    offset,
  } = getPaginationParams(req.query);

  return getAllFeedback({ limit, offset })
    .then((items) => {
      const users = new Users();

      items.forEach(({ userId }) => {
        users.add(userId);
      });

      return Promise.all<IFeedback[] | IUser>([items, ...users.fetchRequests()]);
    })
    .then((data) => {
      const [items, ...allUsers] = data as [IFeedback[], ...IUser[]];

      const newItems = items.map((item) => {
        const objectItem = item.toObject();

        const user = allUsers.find((u) => u.id === objectItem.userId);

        if (user !== undefined) {
          return {
            ...objectItem,
            user,
          };
        }

        return objectItem;
      });

      res.send({
        items: newItems,
        total: newItems.length,
      });
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.getAll('feedback messages'),
      });
    });
};
