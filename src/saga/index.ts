import { fork, spawn } from 'redux-saga/effects';
import leaderboardSaga from '@/saga/leaderboard';
import userSaga from '@/saga/user';

export default function* rootSaga() {
  yield spawn(leaderboardSaga);
  yield fork(userSaga);
}
