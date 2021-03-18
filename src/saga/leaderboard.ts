import { takeLatestRequest } from '@/utils/redux/sagas';
import { addScoreToLeaderboard, getAllScoreFromLeaderboard } from '@/actions/leaderboard';
import { addScoreToLeaderboardRequest, getAllScoreFromLeaderboardRequest } from '@/api/leaderboard';

export default function* leaderboardSaga() {
  yield takeLatestRequest(addScoreToLeaderboard, addScoreToLeaderboardRequest);
  yield takeLatestRequest(getAllScoreFromLeaderboard, getAllScoreFromLeaderboardRequest);
}
