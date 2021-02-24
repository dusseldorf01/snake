import {
  ActionCreatorWithoutPayload,
  createAction,
  PayloadActionCreator,
} from '@reduxjs/toolkit';
import {
  AsyncActionCreator,
  createAsyncActions,
} from '@/utils/redux/actions';
import type {
  IComment,
  ICommentAction,
  IPost,
} from '@/models/forum';

type PostActionsType = {
  likeAddRequest: PayloadActionCreator<number>;
  likeAddSuccess: PayloadActionCreator<number>;
  likeAddError: ActionCreatorWithoutPayload;
  likeDeleteRequest: PayloadActionCreator<number>;
  likeDeleteSuccess: PayloadActionCreator<number>;
  likeDeleteError: ActionCreatorWithoutPayload;
  addCommentRequest: PayloadActionCreator<ICommentAction>;
  addCommentSuccess: PayloadActionCreator<IComment[]>;
  addCommentError: ActionCreatorWithoutPayload;
} & AsyncActionCreator<IPost>;

const type = 'POST';

const postActions: PostActionsType = {
  ...createAsyncActions<IPost>(type),
  likeAddRequest: createAction<number>(`${type}_LIKE_ADD_REQUEST`),
  likeAddSuccess: createAction<number>(`${type}_LIKE_ADD_SUCCESS`),
  likeAddError: createAction(`${type}_LIKE_ADD_ERROR`),
  likeDeleteRequest: createAction<number>(`${type}_LIKE_DELETE_REQUEST`),
  likeDeleteSuccess: createAction<number>(`${type}_LIKE_DELETE_SUCCESS`),
  likeDeleteError: createAction(`${type}_LIKE_DELETE_ERROR`),
  addCommentRequest: createAction<ICommentAction>(`${type}_ADD_COMMENT_REQUEST`),
  addCommentSuccess: createAction<IComment[]>(`${type}_ADD_COMMENT_SUCCESS`),
  addCommentError: createAction(`${type}_ADD_COMMENT_ERROR`),
};

export default postActions;
