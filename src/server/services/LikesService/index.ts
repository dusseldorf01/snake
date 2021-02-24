import {
  Like,
  Post,
} from '@/server/models';
import type { ILikeCreate } from '@/models/forum';

export default class LikesService {
  public static create = (body: ILikeCreate) => (
    Like.create(
      body,
      {
        include: [Post],
      },
    )
  );

  public static delete = ({ userId, postId }: ILikeCreate) => (
    Like.destroy({
      where: {
        postId: Number(postId),
        userId,
      },
    })
  );
}
