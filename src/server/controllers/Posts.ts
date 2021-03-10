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
import {
  create as createPost,
  getAll as getAllPosts,
  getById as getPostById,
} from '@/server/services/PostsService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import { getByParentId as getCommentsByParentId } from '@/server/services/CommentsService';
import Users from '@/server/lib/Users';
import { IUser } from '@/models/user';
import { Post } from '@/server/models';

export const create = (req: Request<any, any, IPostCreateModel>, res: Response) => {
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

  // eslint-disable-next-line consistent-return
  return createPost({ text, title, userId })
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.create('post'),
      });
    });
};

export const getAll = (req: Request, res: Response) => {
  const {
    limit,
    offset,
  } = getPaginationParams(req.query);

  const users = new Users();

  return getAllPosts({ limit, offset })
    .then(({ count, rows: items }) => {
      items.forEach(({ userId }) => {
        users.add(userId);
      });

      return Promise
        .all<Post[] | number | IUser>(
        [items, (count as unknown as any[]).length, ...users.fetchRequests()],
      );
    })
    .then((data) => {
      const [items, total, ...allUsers] = data as [Post[], number, ...IUser[]];
      items.forEach((post) => {
        const userId = post.getDataValue('userId');

        post.setDataValue('user', allUsers.find(({ id }) => id === userId));
      });

      res.send({ total, items });
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.getAll('posts'),
      });
    });
};

export const getById = (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;

  const users = new Users();

  return getPostById(id)
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
            getCommentsByParentId(element.id)
              .then((children) => {
                (elements[index] as unknown as Model).setDataValue('children', children);

                queue.push(children as unknown as IComment[]);
              })
          )));
      }

      // eslint-disable-next-line consistent-return
      return Promise
        .all<Post | IUser>([post, ...users.fetchRequests()]);
    })
    .then((data) => {
      if (data === undefined) {
        return;
      }

      const [post, ...allUsers] = data as [Post, ...IUser[]];
      (post as unknown as Model).setDataValue('user', allUsers.find((u) => u.id === post.userId));

      const comments = post.getDataValue('comments') as IComment[];

      const newQueue: IComment[] = [...comments];

      while (newQueue.length > 0) {
        const comment = newQueue.shift() as IComment;
        const commentChildren = (comment as unknown as Model).getDataValue('children');

        (comment as unknown as Model).setDataValue('user', allUsers.find((u) => u.id === comment.userId));

        newQueue.push(...commentChildren);
      }

      res.send(post);
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.getById('post', id),
      });
    });
};
