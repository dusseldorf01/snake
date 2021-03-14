import { combineReducers } from 'redux';
import { createAsyncReducer, initialAsyncState, initialAsyncStateNoLoad } from '@/utils/redux/reducers';
import {
  signInActions, signOutActions, signUpActions, signInOauthActions, userInfoActions,
  userPasswordActions, userDataActions, userAvatarActions,
} from '@/actions/user';

const signUp = createAsyncReducer(initialAsyncStateNoLoad, signUpActions);
const signIn = createAsyncReducer(initialAsyncStateNoLoad, signInActions);
const signInOauth = createAsyncReducer(initialAsyncStateNoLoad, signInOauthActions);
const signOut = createAsyncReducer(initialAsyncStateNoLoad, signOutActions);
const info = createAsyncReducer(initialAsyncState, userInfoActions);

const userDataUpdate = createAsyncReducer(initialAsyncStateNoLoad, userDataActions);
const userAvatarUpdate = createAsyncReducer(initialAsyncStateNoLoad, userAvatarActions);
const userPasswordUpdate = createAsyncReducer(initialAsyncStateNoLoad, userPasswordActions);

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
