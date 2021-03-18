import { RootState } from '@/reducers';

// eslint-disable-next-line import/prefer-default-export
export const leaderboardScoresStateSelector = (state:RootState) => state.leaderboard.scores;
