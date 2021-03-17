import { createAsyncActions } from '@/utils/redux/actions';

export const addScoreToLeaderboard = createAsyncActions('ADD_SCORE_TO_LEADERBOARD');
export const getAllScoreFromLeaderboard = createAsyncActions('GET_SCORE_FROM_LEADERBOARD');
