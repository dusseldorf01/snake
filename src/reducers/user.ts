import { combineReducers } from 'redux';
import {
  AsyncReducerState,
  createAsyncReducer,
  getInitialAsyncState,
  getInitialAsyncStateNoLoad,
} from '@/utils/redux/reducers';
import {
  signInActions, signOutActions, signUpActions, userInfoActions,
  userPasswordActions, userDataActions, userAvatarActions,
} from '@/actions/user';
import type { IUser } from '@/models/user';

const signUp = createAsyncReducer(getInitialAsyncStateNoLoad({}), signUpActions);
const signIn = createAsyncReducer(getInitialAsyncStateNoLoad({}), signInActions);
const signOut = createAsyncReducer(getInitialAsyncStateNoLoad({}), signOutActions);
const info = createAsyncReducer<IUser, AsyncReducerState<IUser>>(
  getInitialAsyncState({} as IUser),
  userInfoActions,
);

const userDataUpdate = createAsyncReducer(initialAsyncStateNoLoad, userDataActions);
const userAvatarUpdate = createAsyncReducer(initialAsyncStateNoLoad, userAvatarActions);
const userPasswordUpdate = createAsyncReducer(initialAsyncStateNoLoad, userPasswordActions);

const user = combineReducers({
  signUp,
  signIn,
  signOut,
  info,
  userDataUpdate,
  userAvatarUpdate,
  userPasswordUpdate,
});

export default user;
