import type {
  Request,
  Response,
} from 'express';
import { Model } from 'sequelize';
import type {
  IComment,
  IPostCreateModel,
} from '@/models/forum';
import getPaginationParams from '@/utils/api/getPaginationParams';
import PostsService from '@/server/services/PostsService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import CommentsService from '@/server/services/CommentsService';
import Users from '@/server/lib/Users';

export default class Posts {
  public static create = (req: Request<any, any, IPostCreateModel>, res: Response) => {
    const {
      text,
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

    if (!text || !title) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send({
        message: responseErrorMessages.required<IPostCreateModel>(['text', 'title']),
      });
      return;
    }

    PostsService
      .create({ text, title, userId })
      .then((data) => {
        res.send(data);
      }).catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.create('post'),
        });
      });
  };

  public static getAll = (req: Request, res: Response) => {
    const {
      limit,
      offset,
    } = getPaginationParams(req.query);

    const users = new Users();

    PostsService
      .getAll({ limit, offset })
      .then(({ count, rows: items }) => {
        items.forEach(({ userId }) => {
          users.add(userId);
        });

        return Promise
          .all(users.fetchRequests())
          .then((allUsers) => {
            items.forEach((post) => {
              const userId = post.getDataValue('userId');

              post.setDataValue('user', allUsers.find(({ id }) => id === userId));
            });

            res.send({ total: (count as unknown as any[]).length, items });
          });
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.getAll('posts'),
        });
      });
  };

  public static getById = (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    const users = new Users();

    PostsService
      .getById(id)
      .then(async (post) => {
        if (!post) {
          res.status(RESPONSE_CODE.BAD_REQUEST).send({
            message: responseErrorMessages.notExist('post', id),
          });
          return;
        }

        const userId = post.getDataValue('userId');

        users.add(userId);

        const comments = post.getDataValue('comments') as IComment[];

        const queue: IComment[][] = [comments];

        while (queue.length > 0) {
          const elements = queue.shift() || [];

          elements.forEach((element) => {
            users.add(element.userId);
          });

          // eslint-disable-next-line no-await-in-loop
          await Promise
            .all(elements.map((element, index) => (
              CommentsService.getByParentId(element.id)
                .then((children) => {
                  (elements[index] as unknown as Model).setDataValue('children', children);

                  queue.push(children as unknown as IComment[]);
                })
            )));
        }

        // eslint-disable-next-line consistent-return
        return Promise
          .all(users.fetchRequests())
          .then((allUsers) => {
            (post as unknown as Model).setDataValue('user', allUsers.find((u) => u.id === post.userId));

            const newQueue: IComment[] = [...comments];

            while (newQueue.length > 0) {
              const comment = newQueue.shift() as IComment;
              const commentChildren = (comment as unknown as Model).getDataValue('children');

              (comment as unknown as Model).setDataValue('user', allUsers.find((u) => u.id === comment.userId));

              newQueue.push(...commentChildren);
            }

            res.send(post);
          });
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.getById('post', id),
        });
      });
  };
}
