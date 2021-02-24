import {
  Effect,
  put,
  select,
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
  pageRegexp,
  postRegexp,
} from '@/routerRegexp';
import postSelector from '@/selectors/post';

function* changeRouterSaga(action: Effect<LocationChangeAction>) {
  const { payload: { location } } = action;
  const { pathname, search, hash } = location;

  if (forumRegexp.test(pathname)) {
    const page = Number(search.replace(pageRegexp, '$1')) || 1;

    yield put(postsListActions.getPostsList(page));
  }

  if (postRegexp.test(pathname)) {
    const { data: post } = yield select(postSelector);

    if (Object.keys(post).length === 0 || hash === '') {
      const id = pathname.replace(postRegexp, '$1');

      yield put(postActions.request({ params: { data: { id } } }));
    }
  }
}

export default function* routerSaga() {
  yield takeEvery(LOCATION_CHANGE, changeRouterSaga);
}
