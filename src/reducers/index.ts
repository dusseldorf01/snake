import { combineReducers } from 'redux';
import type { CombinedState, PayloadAction } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import user from '@/reducers/user';
import userTheme from '@/reducers/userTheme';
import postsList from '@/reducers/postsList';
import post from '@/reducers/post';
import game from '@/reducers/game';
import { signOutActions } from '@/actions/user';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { History } from 'history';

const rootReducer = (history: History) => combineReducers({
  game,
  user,
  userTheme,
  postsList,
  post,
  router: connectRouter(history),
});

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

const withLogoutCleaner = (history: History) => (
  state:CombinedState<any>,
  action:PayloadAction,
) => rootReducer(history)(
  action.type === signOutActions.success.toString() ? undefined : state,
  action,
);

export default withLogoutCleaner;
