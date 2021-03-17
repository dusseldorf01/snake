import { combineReducers } from 'redux';
import { createAsyncReducer, getInitialAsyncState } from '@/utils/redux/reducers';
import {
  getAllScoreFromLeaderboard,
} from '@/actions/leaderboard';

const scores = createAsyncReducer(getInitialAsyncState({}), getAllScoreFromLeaderboard);

const leaderboard = combineReducers({
  scores,
});

export default leaderboard;
