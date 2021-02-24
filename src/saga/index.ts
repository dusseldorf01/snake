import { fork } from 'redux-saga/effects';
import userSaga from '@/saga/user';
import gameSaga from '@/saga/game';

export default function* rootSaga() {
  yield fork(userSaga);

  yield fork(gameSaga);
}
