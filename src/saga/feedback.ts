import { takeLatestRequest } from '@/utils/redux/sagas';
import feedbackActions from '@/actions/feedback';
import { sendFeedback } from '@/api/feedback';

export default function* feedbackSaga() {
  yield takeLatestRequest(
    feedbackActions,
    sendFeedback,
    { error: 'При отправке сообщения произошла ошибка', success: 'Сообщение успешно отправлено' },
  );
}
