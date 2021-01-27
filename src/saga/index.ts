import { spawn } from 'redux-saga/effects';
import { userSaga, userUpdateDataSaga } from '@/saga/user';

export default function* rootSaga() {
  yield spawn(userSaga);
  yield spawn(userUpdateDataSaga);
}
