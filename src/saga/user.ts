import { spawn, take, put } from 'redux-saga/effects';
import { takeLatestRequest } from '@/utils/redux/sagas';
import {
  signInActions, signOutActions, signUpActions, userInfoActions,
  userAvatarActions, userDataActions, userPasswordActions,
} from '@/actions/user';
import {
  getUserInfo, signIn, signOut, signUp,
} from '@/api/auth';

import {
  changeUserProfile, changeUserAvatar, changeUserPassword,
} from '@/api/user';

function* afterSignIn() {
  yield take([signInActions.success.toString(), signUpActions.success.toString()]);
  yield put(userInfoActions.request());
}

function* afterUserDataUpdate() {
  yield take([userDataActions.success.toString(), userPasswordActions.success.toString()]);
  yield put(userInfoActions.request());
}

export function* userSaga() {
  yield takeLatestRequest(userInfoActions, getUserInfo);
  yield takeLatestRequest(signInActions, signIn);
  yield takeLatestRequest(signUpActions, signUp);
  yield takeLatestRequest(signOutActions, signOut);
  yield spawn(afterSignIn);
}

export function* userUpdateDataSaga() {
  yield takeLatestRequest(userAvatarActions, changeUserAvatar);
  yield takeLatestRequest(userDataActions, changeUserProfile);
  yield takeLatestRequest(userPasswordActions, changeUserPassword);
  yield spawn(afterUserDataUpdate);
}
