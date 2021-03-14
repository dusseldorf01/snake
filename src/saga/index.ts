import { fork } from 'redux-saga/effects';
import leaderboardSaga from '@/saga/leaderboard';
import userSaga from '@/saga/user';

export default function* rootSaga() {
  yield fork(leaderboardSaga);
  yield fork(userSaga);
}
