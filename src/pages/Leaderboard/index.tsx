import LeaderboardTable from '@/components/LeaderboardTable';
import cssCommon from '@/styles/common.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllScoreFromLeaderboard } from '@/actions/leaderboard';
import { leaderboardScoresStateSelector } from '@/selectors/leaderboard';
import type { ILeaderboardITableRow } from '@/components/LeaderboardTable/interfaces';
import Alert from '@/components/Alert';
import Loader from '@/components/Loader';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const leaderboardState = useSelector(leaderboardScoresStateSelector);

  const { data, loading, error } = leaderboardState;

  let normData;
  if (Array.isArray(data) && data.length) {
    normData = data
      .map((item:{data:ILeaderboardITableRow}) => item.data)
      .filter((item:ILeaderboardITableRow) => item.id && item.level)
      .map(({
        id, login, level, score,
      }) => ({
        id, login, level, score,
      }));
  }

  useEffect(() => {
    dispatch(getAllScoreFromLeaderboard.request({ params: { data: { ratingFieldName: 'score', cursor: 0, limit: 10 } } }));
  }, []);

  return (
    <div className={cssCommon.pageHalfContent}>
      <h1 className={cssCommon.visuallyHidden}>Таблица лидеров</h1>
      {
        loading && (<div className={cssCommon.centerContent}><Loader /></div>)
      }
      {
        error && (<Alert>Ошибка получения данных...</Alert>)
      }
      {
        normData && (<LeaderboardTable data={normData} />)
      }
    </div>
  );
};

export default Leaderboard;
