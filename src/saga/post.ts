import {
  call,
  Effect,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
import { takeLatestRequest } from '@/utils/redux/sagas';
import postActions from '@/actions/post';
import {
  addComment,
  addLike,
  deleteLike,
  getPost,
} from '@/api/posts';
import type {
  IComment,
  ICommentAction,
  ICommentResponse,
  ILike,
} from '@/models/forum';
import { userStateSelector } from '@/selectors/user';
import pushComment from '@/utils/pushComment';
import postSelector from '@/selectors/post';

function* addLikeSaga(action: Effect<string, number>) {
  try {
    const response: AxiosResponse<ILike> = yield call(addLike, action.payload);
    yield put(postActions.likeAddSuccess(response.data.userId));
  } catch (e) {
    yield put(postActions.likeAddError());
  }
}

function* deleteLikeSaga(action: Effect< string, number>) {
  try {
    yield call(deleteLike, action.payload);
    const { data: { id } } = yield select(userStateSelector);
    yield put(postActions.likeDeleteSuccess(id));
  } catch (e) {
    yield put(postActions.likeDeleteError());
  }
}

function* addCommentSaga(action: Effect<string, ICommentAction>) {
  try {
    const response: AxiosResponse<ICommentResponse> = yield call(addComment, action.payload);
    const { data } = yield select(userStateSelector);
    const { data: { comments } } = yield select(postSelector);
    const newComment: IComment = {
      ...response.data,
      children: [],
      user: data,
    };
    const newComments = yield call(pushComment, comments, newComment);
    yield put(postActions.addCommentSuccess(newComments));
    window.location.hash = `comment-${response.data.id}`;
  } catch (e) {
    yield put(postActions.addCommentError());
  }
}

export default function* postSaga() {
  yield takeLatestRequest(postActions, getPost);

  yield takeEvery(postActions.likeAddRequest, addLikeSaga);

  yield takeEvery(postActions.likeDeleteRequest, deleteLikeSaga);

  yield takeEvery(postActions.addCommentRequest, addCommentSaga);
}
