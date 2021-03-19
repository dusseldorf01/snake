import { combineReducers } from 'redux';
import {
  AsyncReducerState,
  createAsyncReducer,
  getInitialAsyncState,
  getInitialAsyncStateNoLoad,
} from '@/utils/redux/reducers';
import {
  signInActions,
  signInOauthActions,
  signOutActions,
  signUpActions,
  userInfoActions,
  userPasswordActions,
  userDataActions,
  userAvatarActions,
} from '@/actions/user';
import type { IUser } from '@/models/user';

const signUp = createAsyncReducer<any>(getInitialAsyncStateNoLoad({}), signUpActions);
const signIn = createAsyncReducer<any>(getInitialAsyncStateNoLoad({}), signInActions);
const signInOauth = createAsyncReducer<any>(getInitialAsyncStateNoLoad({}), signInOauthActions);
const signOut = createAsyncReducer(getInitialAsyncStateNoLoad({}), signOutActions);
const info = createAsyncReducer<IUser, AsyncReducerState<IUser>>(
  getInitialAsyncState({} as IUser),
  userInfoActions,
);

const userDataUpdate = createAsyncReducer<any>(getInitialAsyncStateNoLoad({}), userDataActions);
const userAvatarUpdate = createAsyncReducer<any>(getInitialAsyncStateNoLoad({}), userAvatarActions);
const userPasswordUpdate = createAsyncReducer<any>(
  getInitialAsyncStateNoLoad({}),
  userPasswordActions,
);

const user = combineReducers({
  signUp,
  signIn,
  signOut,
  info,
  signInOauth,
  userDataUpdate,
  userAvatarUpdate,
  userPasswordUpdate,
});

export default user;
