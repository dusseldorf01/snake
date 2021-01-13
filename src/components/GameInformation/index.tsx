import { memo } from 'react';
import { IGameInformation } from './interfaces';
import './index.css';

const GameInformation = ({
  level,
  score,
  timeToRemoveBigFood,
}: IGameInformation) => (
  <div className="game-information">
    <div className="game-information__item">{`Уровень: ${level}`}</div>
    <div className="game-information__item">
      {timeToRemoveBigFood > 0 && (
        `Бонусная еда: ${Math.round(timeToRemoveBigFood / level)}`
      )}
    </div>
    {score.length === 1 && (
      <div className="game-information__item">{`Очки: ${score}`}</div>
    )}
    {score.length === 2 && (
      score.map((sc, index) => (
        <div
          key={`${index + 1}`}
          className="game-information__item"
        >
          {`Очки (${index + 1}-й игрок): ${sc}`}
        </div>
      ))
    )}
  </div>
);

export default memo(GameInformation);
