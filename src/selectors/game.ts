import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/reducers';

const gameSelector = createSelector(
  (state: RootState) => state.game,
  (state) => state,
);

export default gameSelector;
