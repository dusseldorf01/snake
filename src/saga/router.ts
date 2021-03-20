import {
  Effect,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  LocationChangeAction,
} from 'connected-react-router';
import postsListActions from '@/actions/postsList';
import postActions from '@/actions/post';
import {
  forumRegexp,
  leaderboardRegexp,
  pageRegexp,
  postRegexp,
} from '@/routerRegexp';
import { getAllScoreFromLeaderboard } from '@/actions/leaderboard';

function* changeRouterSaga(action: Effect<LocationChangeAction>) {
  const { payload: { location } } = action;
  const { pathname, search } = location;

  if (forumRegexp.test(pathname)) {
    const page = Number(search.replace(pageRegexp, '$1')) || 1;

    yield put(postsListActions.getPostsList(page));
  }

  if (postRegexp.test(pathname)) {
    const id = pathname.replace(postRegexp, '$1');

    yield put(postActions.request({ params: { data: { id } } }));
  }

  if (leaderboardRegexp.test(pathname)) {
    yield put(getAllScoreFromLeaderboard.request({ params: { data: { ratingFieldName: 'score', cursor: 0, limit: 10 } } }));
  }
}

export default function* routerSaga() {
  yield takeEvery(LOCATION_CHANGE, changeRouterSaga);
}
