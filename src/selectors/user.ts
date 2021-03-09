import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/reducers';

export const userStateSelector = (state:RootState) => state.user.info;
export const userIsAuthorizedSelector = createSelector(
  userStateSelector,
  (userState) => !!userState.data.id,
);

export const userIsOauthAutorized = (state:RootState) => state.user.signInOauth;

export const signInStateSelector = (state:RootState) => state.user.signIn;
export const signUpStateSelector = (state:RootState) => state.user.signUp;

export const userSettingsStateSelector = (state:RootState) => ({
  password: state.user.userPasswordUpdate,
  avatar: state.user.userAvatarUpdate,
  other: state.user.userDataUpdate,
});
