import { fork, spawn } from 'redux-saga/effects';
import { userSaga, userUpdateDataSaga } from '@/saga/user';
import leaderboardSaga from '@/saga/leaderboard';
import gameSaga from '@/saga/game';

export default function* rootSaga() {
  yield fork(leaderboardSaga);
  yield fork(userSaga);
  yield spawn(userUpdateDataSaga);
  yield fork(gameSaga);
}
