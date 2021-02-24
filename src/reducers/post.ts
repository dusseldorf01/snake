import {
  AsyncReducerState,
  createAsyncReducer,
  getInitialAsyncState,
} from '@/utils/redux/reducers';
import type { IPost } from '@/models/forum';
import postActions from '@/actions/post';

type PostStateType = {
  updatingLike: boolean;
  addingComment: boolean;
} & AsyncReducerState<IPost>;

const getInitialPostState = (): PostStateType => ({
  ...getInitialAsyncState<IPost>({} as IPost),
  updatingLike: false,
  addingComment: false,
});

const post = createAsyncReducer<IPost, PostStateType>(
  getInitialPostState(),
  postActions,
  ((builder) => {
    builder
      .addCase(postActions.likeAddRequest, (state) => ({
        ...state,
        updatingLike: true,
      }))
      .addCase(postActions.likeAddSuccess, (state, action) => ({
        ...state,
        data: {
          ...state.data,
          likes: [...state.data.likes, { userId: action.payload }],
        },
        updatingLike: false,
      }))
      .addCase(postActions.likeAddError, (state) => ({
        ...state,
        updatingLike: false,
      }))
      .addCase(postActions.likeDeleteRequest, (state) => ({
        ...state,
        updatingLike: true,
      }))
      .addCase(postActions.likeDeleteSuccess, (state, action) => ({
        ...state,
        data: {
          ...state.data,
          likes: state.data.likes.filter(({ userId }) => userId !== action.payload),
        },
        updatingLike: false,
      }))
      .addCase(postActions.likeDeleteError, (state) => ({
        ...state,
        updatingLike: false,
      }))
      .addCase(postActions.addCommentRequest, (state) => ({
        ...state,
        addingComment: true,
      }))
      .addCase(postActions.addCommentSuccess, (state, action) => ({
        ...state,
        data: {
          ...state.data,
          comments: action.payload,
        },
        addingComment: false,
      }))
      .addCase(postActions.addCommentError, (state) => ({
        ...state,
        addingComment: false,
      }));
  }),
);

export default post;
