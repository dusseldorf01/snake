import { fork } from 'redux-saga/effects';
import { userSaga, userUpdateDataSaga } from '@/saga/user';
import userThemeSaga from '@/saga/userTheme';
import postsListSaga from '@/saga/postsList';
import postSaga from '@/saga/post';
import feedbackSaga from '@/saga/feedback';
import routerSaga from '@/saga/router';
import gameSaga from '@/saga/game';

export default function* rootSaga() {
  yield fork(userSaga);

  yield fork(userUpdateDataSaga);

  yield fork(userThemeSaga);

  yield fork(postsListSaga);

  yield fork(postSaga);

  yield fork(feedbackSaga);

  yield fork(routerSaga);

  yield fork(gameSaga);
}
