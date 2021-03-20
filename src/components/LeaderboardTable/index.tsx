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
      {data.length !== 0 ? (
        data.map((row, index) => (
          <tr key={`leaderboard-row-${index + 1}`}>
            <td>{index + 1}</td>
            {Object.entries(row).map(([key, value]) => (
              <td key={key}>{value}</td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>Нет игроков</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default LeaderboardTable;
