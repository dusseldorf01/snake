import type { IUser } from '@/models/user';

export interface ICommentCreateModel {
  text: string;
}

export interface ICommentCreateBody extends ICommentCreateModel {
  parentId?: number | undefined | null;
}

export interface ICommentAction extends ICommentCreateBody {
  postId: number;
}

export interface ICommentCreate extends ICommentAction {
  userId: number;
}

export interface ICommentResponse extends ICommentCreate {
  id: number;
  createdAt: string;
}

export interface IComment extends ICommentResponse {
  children: IComment[];
  user: IUser;
  isSelected?: boolean;
}

export interface IPostCreateModel {
  text: string;
  title: string;
}

export interface IPostCreate extends IPostCreateModel {
  userId: number;
}

export interface IPost extends IPostCreateModel {
  id: number;
  user: IUser;
  comments: IComment[];
  createdAt: string;
  likes: ({ userId: number })[];
}

export interface IPostResponse extends IPostCreateModel {
  id: number;
  createdAt: string;
}

export interface IPostPreview extends IPostResponse {
  user: IUser;
  commentsCount: number;
}

export interface ILikeCreate {
  postId: number;
  userId: number;
}

export interface ILike extends ILikeCreate {
  id: number;
}

export const postCreateInitialModel: IPostCreateModel = {
  title: '',
  text: '',
};

export const commentCreateInitialModel: ICommentCreateModel = {
  text: '',
};
