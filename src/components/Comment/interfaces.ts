import { IComment } from '@/models/forum';

type CommentComponentProps = 'createdAt' | 'id' | 'text' | 'user';

export interface ICommentComponent extends Pick<IComment, CommentComponentProps> {
  childrenComments: IComment[];
  postId: number;
}
