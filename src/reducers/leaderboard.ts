import { combineReducers } from 'redux';
import { createAsyncReducer, initialAsyncState } from '@/utils/redux/reducers';
import {
  getAllScoreFromLeaderboard,
} from '@/actions/leaderboard';

const scores = createAsyncReducer(initialAsyncState, getAllScoreFromLeaderboard);

const leaderboard = combineReducers({
  scores,
});

export default leaderboard;
