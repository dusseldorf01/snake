import postsListActions from '@/actions/postsList';
import {
  AsyncReducerState,
  createAsyncReducer,
  getInitialAsyncState,
} from '@/utils/redux/reducers';
import type { IPostPreview } from '@/models/forum';
import type { TotalList } from '@/models/common';

type PostsListStateType = {
  limit: number;
  page: number;
  updating: boolean;
} & AsyncReducerState<TotalList<IPostPreview>>;

const getInitialPostsListState = (): PostsListStateType => ({
  ...getInitialAsyncState<TotalList<IPostPreview>>({ total: 0, items: [] }),
  updating: false,
  page: 1,
  limit: 4,
});

const postsList = createAsyncReducer<TotalList<IPostPreview>, PostsListStateType>(
  getInitialPostsListState(),
  postsListActions,
  ((builder) => {
    builder
      .addCase(postsListActions.updateRequest, (state) => ({
        ...state,
        updating: true,
      }))
      .addCase(postsListActions.updateSuccess, (state, action) => ({
        ...state,
        updating: false,
        data: {
          items: [action.payload, ...state.data.items.slice(0, state.limit - 1)],
          total: state.data.total + 1,
        },
      }))
      .addCase(postsListActions.updateError, (state) => ({
        ...state,
        updating: false,
      }))
      .addCase(postsListActions.getPostsList, (state, action) => ({
        ...state,
        page: action.payload,
      }));
  }),
);

export default postsList;
