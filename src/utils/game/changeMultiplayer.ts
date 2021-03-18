/* eslint-disable no-param-reassign */
import type { IGameState } from '@/game/interfaces';
import { Direction } from '@/lib/Painter/interfaces';
import maps from '@/game/maps';
import createSnake from '@/utils/game/createSnake';

const changeMultiplayer = (state: IGameState, payload: boolean) => {
  const { snake } = state;

  state.multiplayer = payload;

  if (payload) {
    state.direction = [Direction.Right, Direction.Right];
    state.score = [0, 0];
    state.snake = [...snake, createSnake(maps[state.map], snake[0])];
  } else {
    state.direction = [Direction.Right];
    state.score = [0];
    state.snake = [snake[0]];
  }
};

export default changeMultiplayer;
