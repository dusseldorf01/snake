import {
  Direction,
  ISnakePart,
  IWall,
} from '@/lib/Painter/interfaces';
import getRandom from '@/utils/getRandom';
import getLast from '@/utils/getLast';
import gameConfig from '@/game/config';
import {
  getNextXCoordinate,
  getPrevXCoordinate,
} from '@/utils/game/getCoordinates';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
} = gameConfig;

const createSnake = (walls: IWall[], existingSnake: ISnakePart[] = []): ISnakePart[] => {
  const barrier = [...walls, ...existingSnake];
  let x: number = 0;
  let y: number = 0;
  let isBarrier: boolean;

  do {
    isBarrier = false;
    x = getRandom(0, BOARD_WIDTH_ITEMS_COUNT - 1);
    y = getRandom(0, BOARD_HEIGHT_ITEMS_COUNT - 1);

    for (let i = 1; i <= 10; i += 1) {
      isBarrier = isBarrier
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        || !!barrier.find((w) => w.x === getPrevXCoordinate(x + i) && w.y === y);
    }
  } while (isBarrier);

  const snake: ISnakePart[] = [{ x, y, direction: Direction.Right }];

  for (let i = 0; i < 3; i += 1) {
    const last = getLast(snake);

    snake.push({
      x: getNextXCoordinate(last.x),
      y: last.y,
      direction: Direction.Right,
    });
  }

  return snake;
};

export default createSnake;
