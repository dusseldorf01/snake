import { ILeaderboardTable } from './interfaces';
import css from './index.css';

const LeaderboardTable = ({
  data,
}: ILeaderboardTable) => (
  <table className={css.leaderboardTable}>
    <thead>
      <tr>
        <th>#</th>
        <th>Ник</th>
        <th>Уровень</th>
        <th>Очки</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {Object.entries(row).map(([key, value]) => (
            <td key={key}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default LeaderboardTable;
