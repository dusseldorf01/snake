import LeaderboardTable from '@/components/LeaderboardTable';
import cssCommon from '@/styles/common.css';
import { useSelector } from 'react-redux';
import { leaderboardScoresStateSelector } from '@/selectors/leaderboard';
import withDataLoader from '@/hocs/withDataLoader';

const Leaderboard = () => {
  const leaderboardState = useSelector(leaderboardScoresStateSelector);
  const { data } = leaderboardState;

  let normData;
  if (Array.isArray(data) && data.length) {
    normData = data
      .map((item) => item.data)
      .filter((item) => item.score && item.level)
      .map(({
        login, level, score,
      }) => ({
        login, level, score,
      }));
  }

  return (
    <div className={cssCommon.pageHalfContent}>
      <h1 className={cssCommon.visuallyHidden}>Таблица лидеров</h1>
      {
        normData && (<LeaderboardTable data={normData} />)
      }
    </div>
  );
};

export default withDataLoader(leaderboardScoresStateSelector)(Leaderboard);
