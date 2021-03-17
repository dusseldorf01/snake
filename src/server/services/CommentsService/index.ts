import {
  Comment,
  Post,
} from '@/server/models';
import type { ICommentCreate } from '@/models/forum';

export const create = ({
  postId,
  text,
  userId,
  parentId,
}: ICommentCreate) => (
  Comment.create(
    {
      text,
      userId,
      postId,
      parentId,
    },
    {
      include: [Post],
    },
  )
);

export const getByParentId = (parentId: number) => (
  Comment.findAll({
    where: {
      parentId,
    },
  })
);
