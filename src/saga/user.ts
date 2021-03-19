import { spawn, take, put } from 'redux-saga/effects';
import { takeLatestRequest } from '@/utils/redux/sagas';
import {
  signInActions, signOutActions, signUpActions, userInfoActions, signInOauthActions,
  userAvatarActions, userDataActions, userPasswordActions,
} from '@/actions/user';
import {
  getUserInfo, signIn, signOut, signUp,
} from '@/api/auth';
import { signInOauth } from '@/api/oauth';
import {
  changeUserProfile, changeUserAvatar, changeUserPassword,
} from '@/api/user';

function* afterSignIn() {
  yield take([signInActions.success.toString(), signInOauthActions.success.toString(),
    signUpActions.success.toString()]);
  yield put(userInfoActions.request());
}

function* afterUserDataUpdate() {
  yield take([userDataActions.success.toString(), userPasswordActions.success.toString()]);
  yield put(userInfoActions.request());
}

function* afterSignOut() {
  yield take(signOutActions.success);
  yield put(userInfoActions.request());
}

export function* userSaga() {
  yield takeLatestRequest(userInfoActions, getUserInfo);
  yield takeLatestRequest(signInOauthActions, signInOauth);
  yield takeLatestRequest(signInActions, signIn);
  yield takeLatestRequest(signUpActions, signUp);
  yield takeLatestRequest(signOutActions, signOut);
  yield spawn(afterSignIn);
  yield spawn(afterSignOut);
}

export function* userUpdateDataSaga() {
  yield takeLatestRequest(
    userAvatarActions,
    changeUserAvatar,
    { error: 'При обновлении аватарки произошла ошибка', success: 'Аватарка успешно обновлена' },
  );
  yield takeLatestRequest(
    userDataActions,
    changeUserProfile,
    { error: 'При обновлении профиля произошла ошибка', success: 'Профиль успешно обновлен' },
  );
  yield takeLatestRequest(
    userPasswordActions,
    changeUserPassword,
    { error: 'При обновлении пароля произошла ошибка', success: 'Пароль успешно обновлен' },
  );
  yield spawn(afterUserDataUpdate);
}
