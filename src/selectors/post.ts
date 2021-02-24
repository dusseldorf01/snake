import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/reducers';

const postSelector = createSelector(
  (state: RootState) => state.post,
  (post) => post,
);

export default postSelector;
