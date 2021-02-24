import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/reducers';

const postsListSelector = createSelector(
  (state: RootState) => state.postsList,
  (state) => state,
);

export default postsListSelector;
