import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/reducers';

export const userStateSelector = (state:RootState) => state.user.info;
export const userIsAuthorizedSelector = createSelector(
  userStateSelector,
  (userState) => !!userState.data.id,
);

export const userIsOauthAutorized = (state:RootState) => state.user;

export const signInStateSelector = (state:RootState) => state.user.signIn;
