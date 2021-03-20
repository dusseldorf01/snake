import {
  call,
  Effect,
  put,
  select,
  spawn,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { userInfoActions } from '@/actions/user';
import userThemeActions from '@/actions/userTheme';
import { takeLatestRequest } from '@/utils/redux/sagas';
import {
  getUserTheme,
  updateUserTheme,
} from '@/api/userTheme';
import type { AsyncSuccessPayload } from '@/utils/redux/actions';
import cssRoot from '@/styles/variables.css';
import userThemeSelector from '@/selectors/userTheme';
import {
  IUserTheme,
  Theme,
} from '@/models/theme';

function* requestUserThemeSaga() {
  yield take(userInfoActions.success.toString());
  yield put(userThemeActions.request());
}

function* onSuccessUserThemeSaga(
  params: Effect<string, AsyncSuccessPayload<IUserTheme>>,
) {
  const html = document.querySelector('html');
  const { themeName } = params.payload.data;
  if (themeName === Theme.DARK) {
    yield html?.classList.add(cssRoot[Theme.DARK]);
    yield html?.classList.remove(cssRoot[Theme.LIGHT]);
  } else {
    yield html?.classList.remove(cssRoot[Theme.DARK]);
    yield html?.classList.add(cssRoot[Theme.LIGHT]);
  }
}

function* updateUserThemeSaga() {
  try {
    const { themeName } = yield select(userThemeSelector);
    yield call(updateUserTheme, {
      data: {
        themeName: themeName === Theme.DARK ? Theme.LIGHT : Theme.DARK,
      },
    });
    yield put(userThemeActions.request());
  } catch (e) {
    // error
  }
}

export default function* userThemeSaga() {
  yield takeLatestRequest(userThemeActions, getUserTheme);

  if (!IS_SERVER) {
    yield takeEvery(userThemeActions.success, onSuccessUserThemeSaga);
  }

  yield takeEvery(userThemeActions.updateRequest, updateUserThemeSaga);

  yield spawn(requestUserThemeSaga);
}
