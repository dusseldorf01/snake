import { Direction } from '@/lib/Painter/interfaces';
import type { IGameState } from '@/game/interfaces';

const changeDirection = (
  newDirection: Direction,
  oppositeDirection: Direction,
  number: number,
  state: IGameState,
) => {
  if (
    newDirection !== state.direction[number] && state.lastDirection[number] !== oppositeDirection
  ) {
    // eslint-disable-next-line no-param-reassign
    state.direction[number] = newDirection;
  }
};

export default changeDirection;
