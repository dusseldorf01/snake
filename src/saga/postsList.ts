import {
  call,
  Effect,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
import { takeLatestRequest } from '@/utils/redux/sagas';
import postsListActions from '@/actions/postsList';
import {
  createPost,
  getPosts,
} from '@/api/posts';
import type {
  IPostCreateModel,
  IPostResponse,
} from '@/models/forum';
import { userStateSelector } from '@/selectors/user';
import postsListSelector from '@/selectors/postsList';
import notification from '@/components/Notification';

function* updatePostsListSaga(action: Effect<string, IPostCreateModel>) {
  const {
    text,
    title,
  } = action.payload;
  try {
    const response: AxiosResponse<IPostResponse> = yield call(
      createPost,
      { data: { text, title } },
    );

    const { data } = yield select(userStateSelector);

    yield put(postsListActions.updateSuccess({
      ...response.data,
      commentsCount: 0,
      user: data,
    }));
  } catch (e) {
    yield put(postsListActions.updateError());
    yield notification.error({ message: 'При добавлении поста произошла ошибка' });
  }
}

function* getPostsList(action: Effect<string, number>) {
  const page = action.payload;
  const { limit } = yield select(postsListSelector);

  yield put(postsListActions.request({ params: { data: { $limit: limit, $page: page } } }));
}

export default function* postsListSaga() {
  yield takeLatestRequest(postsListActions, getPosts);

  yield takeEvery(postsListActions.updateRequest, updatePostsListSaga);

  yield takeEvery(postsListActions.getPostsList, getPostsList);
}
