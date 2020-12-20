import { takeLatestRequest } from '@/utils/redux/sagas';
import { userInfoActions } from '@/actions/user';
import { getUserInfo } from '@/api/auth';

export default function* userSaga() {
  yield takeLatestRequest(userInfoActions, getUserInfo);
}
