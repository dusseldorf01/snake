/* eslint-disable no-param-reassign */
import type { IGameState } from '@/game/interfaces';
import maps from '@/game/maps';
import createSnake from '@/utils/game/createSnake';
import createFood from '@/utils/game/createFood';

const changeMap = (state: IGameState, payload: number) => {
  const newMap = maps[payload];

  state.map = payload;

  const isWall = (x: number, y: number) => (
    !!newMap.find((w) => w.x === x && w.y === y)
  );

  state.snake.forEach((snake, index) => {
    if (snake.some(({ x, y }) => (
      isWall(x, y) || isWall(x + 1, y) || isWall(x + 2, y) || isWall(x + 3, y)
      || isWall(x + 4, y)
    ))) {
      if (index === 0) {
        state.snake[0] = createSnake(newMap, state.snake[1] || []);
      } else {
        state.snake[1] = createSnake(newMap, state.snake[0]);
      }

      state.food = createFood(state.snake.flat(), null, newMap);
    }

    if (isWall(state.food.x, state.food.y)) {
      state.food = createFood(state.snake.flat(), null, newMap);
    }
  });
};

export default changeMap;
