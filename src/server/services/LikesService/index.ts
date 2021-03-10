import {
  Like,
  Post,
} from '@/server/models';
import type { ILikeCreate } from '@/models/forum';

export const add = (body: ILikeCreate) => (
  Like.create(
    body,
    {
      include: [Post],
    },
  )
);

export const remove = ({ userId, postId }: ILikeCreate) => (
  Like.destroy({
    where: {
      postId: Number(postId),
      userId,
    },
  })
);
