import {
  Comment,
  Post,
} from '@/server/models';
import type { ICommentCreate } from '@/models/forum';

export default class CommentsService {
  public static create = ({
    postId, text, userId, parentId,
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

  public static getByParentId = (parentId: number) => (
    Comment.findAll({
      where: {
        parentId,
      },
    })
  );
}
