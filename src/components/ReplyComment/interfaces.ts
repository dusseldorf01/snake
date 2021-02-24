import type { IComment } from '@/models/forum';

export interface IReplyComment {
  childrenComments: IComment[];
  parentId: number;
  postId: number;
}
