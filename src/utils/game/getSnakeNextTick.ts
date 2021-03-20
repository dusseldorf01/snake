/* eslint-disable no-param-reassign */
import {
  Direction,
  IFood,
  ISnakePart,
  IWall,
} from '@/lib/Painter/interfaces';
import getLast from '@/utils/getLast';
import getNewSnakePart from '@/utils/game/getNewSnakePart';
import checkReadyToEat from '@/utils/game/checkReadyToEat';
import isBumpIntoWall from '@/utils/game/isBumpIntoWall';
import isDead from '@/utils/game/isDead';

const getSnakeNextTick = (
  bigFood: IFood | null,
  direction: Direction,
  food: IFood,
  snake: ISnakePart[],
  walls: IWall[],
): {
  ate: boolean;
  ateBigFood: boolean;
  isDead: boolean;
  snake: ISnakePart[];
} => {
  const lastPart = getLast(snake);
  if (typeof lastPart === 'undefined') {
    throw new Error('lastPart is  undefined');
  }
  const newHead: ISnakePart = checkReadyToEat(getNewSnakePart(direction, lastPart), food, bigFood);

  const isBumpedIntoWall = isBumpIntoWall(newHead, walls);

  const ateFood = (f: IFood | null) => (
    f !== null && f.x === newHead.x && f.y === newHead.y
  );

  const ate = ateFood(food);
  const ateBigFood = ateFood(bigFood);
  const newSnake = (ate || ateBigFood) ? snake.concat(newHead) : snake.slice(1).concat(newHead);

  return {
    ate,
    ateBigFood,
    isDead: isBumpedIntoWall || isDead(newHead, newSnake),
    snake: newSnake,
  };
};

export default getSnakeNextTick;
