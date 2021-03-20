import type { RootState } from '@/reducers';
import type { PostStateType } from '@/reducers/post';

const postSelector = (state: RootState): PostStateType => state.post;

export default postSelector;
