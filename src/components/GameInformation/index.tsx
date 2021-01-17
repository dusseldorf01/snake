import { memo } from 'react';
import type { IGameInformation } from './interfaces';
import css from './index.css';

const GameInformation = ({
  level,
  score,
  timeToRemoveBigFood,
}: IGameInformation) => (
  <div className={css.gameInformation}>
    <div className={css.gameInformationItem}>{`Уровень: ${level}`}</div>
    <div className={css.gameInformationItem}>
      {timeToRemoveBigFood > 0 && (
        `Бонусная еда: ${Math.round(timeToRemoveBigFood / level)}`
      )}
    </div>
    {score.length === 1 && (
      <div className={css.gameInformationItem}>{`Очки: ${score}`}</div>
    )}
    {score.length === 2 && (
      score.map((sc, index) => (
        <div
          key={`${index + 1}`}
          className={css.gameInformationItem}
        >
          {`Очки (${index + 1}-й игрок): ${sc}`}
        </div>
      ))
    )}
  </div>
);

export default memo(GameInformation);
