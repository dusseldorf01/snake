import { combineReducers } from 'redux';
import {
  AsyncReducerState,
  createAsyncReducer,
  getInitialAsyncState,
  getInitialAsyncStateNoLoad,
} from '@/utils/redux/reducers';
import {
  signInActions, signOutActions, signUpActions, userInfoActions,
} from '@/actions/user';
import type { IUser } from '@/models/user';

const signUp = createAsyncReducer(getInitialAsyncStateNoLoad({}), signUpActions);
const signIn = createAsyncReducer(getInitialAsyncStateNoLoad({}), signInActions);
const signOut = createAsyncReducer(getInitialAsyncStateNoLoad({}), signOutActions);
const info = createAsyncReducer<IUser, AsyncReducerState<IUser>>(
  getInitialAsyncState({} as IUser),
  userInfoActions,
);

const user = combineReducers({
  signUp, signIn, signOut, info,
});

export default user;
