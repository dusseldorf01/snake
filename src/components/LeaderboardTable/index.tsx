import { ILeaderboardTable } from './interfaces';
import css from './index.css';

const LeaderboardTable = ({
  data,
}: ILeaderboardTable) => (
  <table className={css.leaderboardTable}>
    <thead>
      <th>#</th>
      <th>Ник</th>
      <th>Уровень</th>
      <th>Очки</th>
    </thead>
    {data.map((row) => (
      <tr key={row.id}>
        {Object.entries(row).map(([key, value]) => (
          <td key={key}>{value}</td>
        ))}
      </tr>
    ))}
  </table>
);

export default LeaderboardTable;
