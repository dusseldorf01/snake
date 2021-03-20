/* eslint-disable no-param-reassign */
import { GameStatus, IGameState } from '@/game/interfaces';
import maps from '@/game/maps';
import { Direction } from '@/lib/Painter/interfaces';
import createSnake from '@/utils/game/createSnake';
import createFood from '@/utils/game/createFood';

const createGameState = (
  state: IGameState,
) => {
  const {
    level,
    map: mapIndex,
    multiplayer,
  } = state;
  const map = maps[mapIndex];

  const snake1 = createSnake(map);

  state.bigFood = null;
  state.direction = [Direction.Right];
  state.score = [0];
  state.startLevel = level;
  state.snake = [snake1];
  state.status = GameStatus.WAITING_FOR_START;
  state.timeToRemoveBigFood = 0;

  if (multiplayer) {
    state.direction.push(Direction.Right);
    state.lastDirection.push(Direction.Right);
    state.score.push(0);
    state.snake.push(createSnake(map, snake1));
  }

  state.food = createFood(state.snake.flat(), null, map);
};

export default createGameState;
