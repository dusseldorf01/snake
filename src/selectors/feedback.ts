import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/reducers';

const feedbackSelector = createSelector(
  (state: RootState) => state.feedback,
  (state) => state,
);

export default feedbackSelector;
