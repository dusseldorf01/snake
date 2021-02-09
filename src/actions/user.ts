import { createAsyncActions } from '@/utils/redux/actions';

export const signUpActions = createAsyncActions('USER_SIGN_UP');
export const signInActions = createAsyncActions('USER_SIGN_IN');
export const signOutActions = createAsyncActions('USER_SIGN_OUT');
export const userInfoActions = createAsyncActions('USER_INFO_ACTIONS');

export const signInOauthActions = createAsyncActions('USER_SIGN_IN_OAUTH');
