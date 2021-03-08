import { fork } from 'redux-saga/effects';
import userSaga from '@/saga/user';
import leaderboardSaga from '@/saga/leaderboard';

export default function* rootSaga() {
  yield spawn(leaderboardSaga);
  yield fork(userSaga);
}
