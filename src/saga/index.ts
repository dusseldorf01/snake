import { spawn } from 'redux-saga/effects';
import userSaga from '@/saga/user';
import gameSaga from '@/saga/game';

export default function* rootSaga() {
  yield spawn(userSaga);
  yield spawn(gameSaga);
}
