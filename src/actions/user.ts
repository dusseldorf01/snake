import { createAsyncActions } from '@/utils/redux/actions';

export const signUpActions = createAsyncActions('USER_SIGN_UP');
export const signInActions = createAsyncActions('USER_SIGN_IN');
export const signOutActions = createAsyncActions('USER_SIGN_OUT');
export const userInfoActions = createAsyncActions('USER_INFO_ACTIONS');

export const userAvatarActions = createAsyncActions('USER_UPD_AVATAR');
export const userDataActions = createAsyncActions('USER_UPD_DATA');
export const userPasswordActions = createAsyncActions('USER_UPD_PASSWORD');
