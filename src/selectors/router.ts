import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/reducers';

const routerSelector = createSelector(
  (state: RootState) => state.router,
  (router) => router,
);

export default routerSelector;
