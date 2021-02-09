import { combineReducers } from 'redux';
import { createAsyncReducer, initialAsyncState, initialAsyncStateNoLoad } from '@/utils/redux/reducers';
import {
  signInActions, signOutActions, signUpActions, userInfoActions, signInOauthActions,
} from '@/actions/user';

const signUp = createAsyncReducer(initialAsyncStateNoLoad, signUpActions);
const signIn = createAsyncReducer(initialAsyncStateNoLoad, signInActions);
const signInOauth = createAsyncReducer(initialAsyncStateNoLoad, signInOauthActions);
const signOut = createAsyncReducer(initialAsyncStateNoLoad, signOutActions);
const info = createAsyncReducer(initialAsyncState, userInfoActions);

const user = combineReducers({
  signUp, signIn, signOut, info, signInOauth,
});

export default user;
