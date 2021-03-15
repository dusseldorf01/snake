import type {
  IFood,
  ISnakePart,
  IWall,
} from '@/lib/Painter/interfaces';
import gameConfig from '@/game/config';
import getRandom from '@/utils/getRandom';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
} = gameConfig;

const createFood = (
  snake: ISnakePart[],
  existingFood: IFood | null,
  walls: IWall[],
): IFood => {
  let newFood: IFood;
  let isSnake: number;
  let isExistingFood: null | false | number;
  let isWall: boolean;

  do {
    newFood = {
      x: getRandom(0, BOARD_WIDTH_ITEMS_COUNT - 1),
      y: getRandom(0, BOARD_HEIGHT_ITEMS_COUNT - 1),
    };

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    isSnake = snake.findIndex(({ x, y }) => x === newFood.x && y === newFood.y);
    isExistingFood = existingFood && existingFood.x === newFood.x && newFood.y;
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    isWall = walls.some(({ x, y }) => x === newFood.x && y === newFood.y);
  } while (isSnake !== -1 || isExistingFood || isWall);

  return newFood;
};

export default createFood;
