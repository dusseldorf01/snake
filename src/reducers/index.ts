import { combineReducers } from 'redux';
import { CombinedState, PayloadAction } from '@reduxjs/toolkit';
import user from '@/reducers/user';
import leaderboard from '@/reducers/leaderboard';
import { signOutActions } from '@/actions/user';

const rootReducer = combineReducers({
  user,
  leaderboard,
});

export type RootState = ReturnType<typeof rootReducer>;

const withLogoutCleaner = (
  state:CombinedState<any>,
  action:PayloadAction,
) => rootReducer(action.type === signOutActions.success.toString() ? undefined : state, action);

export default withLogoutCleaner;
