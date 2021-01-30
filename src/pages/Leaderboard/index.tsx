import LeaderboardTable from '@/components/LeaderboardTable';
import cssCommon from '@/styles/common.css';

const data = [{
  id: 1,
  login: 'Пользователь 1',
  level: 5,
  score: 136,
}, {
  id: 2,
  login: 'Пользователь 2',
  level: 7,
  score: 131,
}, {
  id: 3,
  login: 'Пользователь 1',
  level: 6,
  score: 107,
}, {
  id: 4,
  login: 'Пользователь 3',
  level: 4,
  score: 88,
}, {
  id: 5,
  login: 'Пользователь 4',
  level: 3,
  score: 62,
}];

const Leaderboard = () => (
  <div className={cssCommon.pageHalfContent}>
    <h1 className={cssCommon.visuallyHidden}>Таблица лидеров</h1>
    <LeaderboardTable data={data} />
  </div>
);

export default Leaderboard;
