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
  IPostPreview,
  IPostCreateModel,
} from '@/models/forum';
import type { TotalList } from '@/models/common';

type PostsListActionsType = {
  getPostsList: PayloadActionCreator<number>;
  updateRequest: PayloadActionCreator<IPostCreateModel>;
  updateSuccess: PayloadActionCreator<IPostPreview>;
  updateError: ActionCreatorWithoutPayload;
} & AsyncActionCreator<TotalList<IPostPreview>>;

const type = 'POSTS_LIST';

const postsListActions: PostsListActionsType = {
  ...createAsyncActions<TotalList<IPostPreview>>(type),
  getPostsList: createAction<number>(`${type}_CHANGE_PAGE`),
  updateRequest: createAction<IPostCreateModel>(`${type}_UPDATE_REQUEST`),
  updateSuccess: createAction<IPostPreview>(`${type}_UPDATE_SUCCESS`),
  updateError: createAction(`${type}_UPDATE_ERROR`),
};

export default postsListActions;
