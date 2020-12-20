import { spawn, take, put } from 'redux-saga/effects';
import { takeLatestRequest } from '@/utils/redux/sagas';
import {
  signInActions, signOutActions, signUpActions, userInfoActions,
} from '@/actions/user';
import {
  getUserInfo, signIn, signOut, signUp,
} from '@/api/auth';

function* afterSignIn() {
  yield take([signInActions.success.toString(), signUpActions.success.toString()]);
  yield put(userInfoActions.request());
}

export default function* userSaga() {
  yield takeLatestRequest(userInfoActions, getUserInfo);
  yield takeLatestRequest(signInActions, signIn);
  yield takeLatestRequest(signUpActions, signUp);
  yield takeLatestRequest(signOutActions, signOut);
  yield spawn(afterSignIn);
}
