import { combineReducers } from 'redux';
import { createAsyncReducer, getInitialAsyncState } from '@/utils/redux/reducers';
import {
  getAllScoreFromLeaderboard,
} from '@/actions/leaderboard';
import { ILeaderboardItem } from '@/models/leaderboard';

const scores = createAsyncReducer<ILeaderboardItem>(
  getInitialAsyncState({} as ILeaderboardItem),
  getAllScoreFromLeaderboard,
);

const leaderboard = combineReducers({
  scores,
});

export default leaderboard;
