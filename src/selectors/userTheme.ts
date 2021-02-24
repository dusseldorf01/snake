import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/reducers';

const userThemeSelector = createSelector(
  (state: RootState) => state.userTheme,
  (state) => state.data,
);

export default userThemeSelector;
