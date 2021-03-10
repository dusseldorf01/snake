import type { RootState } from '@/reducers';
import type { PostsListStateType } from '@/reducers/postsList';

const postsListSelector = (state: RootState): PostsListStateType => state.postsList;

export default postsListSelector;
