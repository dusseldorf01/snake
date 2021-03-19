import { createAsyncActions } from '@/utils/redux/actions';
import { ILeaderboardItem } from '@/models/leaderboard';

export const addScoreToLeaderboard = createAsyncActions('ADD_SCORE_TO_LEADERBOARD');
export const getAllScoreFromLeaderboard = createAsyncActions<ILeaderboardItem>('GET_SCORE_FROM_LEADERBOARD');
