import { spawn } from 'redux-saga/effects';
import userSaga from '@/saga/user';

export default function* rootSaga() {
  yield spawn(userSaga);
}
