import { createAsyncActions } from '@/utils/redux/actions';
import type { IUser } from '@/models/user';

export const signUpActions = createAsyncActions('USER_SIGN_UP');
export const signInActions = createAsyncActions('USER_SIGN_IN');
export const signOutActions = createAsyncActions('USER_SIGN_OUT');
export const userInfoActions = createAsyncActions<IUser>('USER_INFO_ACTIONS');
