import {
  put,
  takeEvery,
} from 'redux-saga/effects';
import { takeLatestRequest } from '@/utils/redux/sagas';
import feedbackActions from '@/actions/feedback';
import { sendFeedback } from '@/api/feedback';
import notification from '@/components/Notification';

function* feedbackSuccessSaga() {
  notification.success({ message: 'Сообщение успешно отправлено' });

  yield put(feedbackActions.clear());
}

function* feedbackErrorSaga() {
  yield notification.error({ message: 'При отправке сообщения произошла ошибка' });
}

export default function* feedbackSaga() {
  yield takeLatestRequest(feedbackActions, sendFeedback);

  yield takeEvery(feedbackActions.success, feedbackSuccessSaga);

  yield takeEvery(feedbackActions.error, feedbackErrorSaga);
}
