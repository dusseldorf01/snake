import { fork, spawn } from 'redux-saga/effects';
import { userSaga, userUpdateDataSaga } from '@/saga/user';

export default function* rootSaga() {
  yield fork(userSaga);
  yield spawn(userUpdateDataSaga);
}
