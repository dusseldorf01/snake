import gameParams from '@/gameParams';
import {
  Direction,
  IFood,
  ISnakeCoordinate,
  ISnakePart,
} from '@/lib/Painter/interfaces';
import getRandom from '@/utils/getRandom';
import getLast from '@/utils/getLast';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
  MAX_LEVEL,
} = gameParams;

const getNextXCoordinate = (x: number) => (
  x < BOARD_WIDTH_ITEMS_COUNT - 1 ? x + 1 : 0
);

const getPrevXCoordinate = (x: number) => (
  x > 0 ? x - 1 : BOARD_WIDTH_ITEMS_COUNT - 1
);

const getNextYCoordinate = (y: number) => (
  y < BOARD_HEIGHT_ITEMS_COUNT - 1 ? y + 1 : 0
);

const getPrevYCoordinate = (y: number) => (
  y > 0 ? y - 1 : BOARD_HEIGHT_ITEMS_COUNT - 1
);

export const getNewSnakePart = (
  direction: Direction, {
    x,
    y,
  }: ISnakePart,
): ISnakeCoordinate => {
  switch (direction) {
    case Direction.TOP:
      return { x, y: getPrevYCoordinate(y), direction };
    case Direction.BOTTOM:
      return { x, y: getNextYCoordinate(y), direction };
    case Direction.LEFT:
      return { x: getPrevXCoordinate(x), y, direction };
    case Direction.RIGHT:
      return { x: getNextXCoordinate(x), y, direction };
    default:
      throw new Error('Unknown direction');
  }
};

export const checkReadyToEat = (
  head: ISnakePart,
  food: IFood,
  bigFood: null | IFood,
): ISnakePart => {
  const { x, y } = head;
  const isFoodNearOnX = (x === getNextXCoordinate(food.x) || x === getPrevXCoordinate(food.x))
    && y === food.y;
  const isFoodNearOnY = (y === getNextYCoordinate(food.y) || y === getPrevYCoordinate(food.y))
    && x === food.x;
  const isBigFoodNearOnX = bigFood && y === bigFood.y && (
    x === getNextXCoordinate(bigFood.x) || x === getPrevXCoordinate(bigFood.x)
  );
  const isBigFoodNearOnY = bigFood && x === bigFood.x && (
    y === getNextYCoordinate(bigFood.y) || y === getPrevYCoordinate(bigFood.y)
  );
  if (isFoodNearOnX || isFoodNearOnY || isBigFoodNearOnX || isBigFoodNearOnY) {
    return {
      ...head,
      readyToEat: true,
    };
  }
  return head;
};

export const createFood = (snake: ISnakePart[], existingFood: IFood | null): IFood => {
  let newFood: IFood;
  let isSnake: number;
  let isExistingFood: null | false | number;

  do {
    newFood = {
      x: getRandom(0, BOARD_WIDTH_ITEMS_COUNT - 1),
      y: getRandom(0, BOARD_HEIGHT_ITEMS_COUNT - 1),
    };

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    isSnake = snake.findIndex(({ x, y }) => x === newFood.x && y === newFood.y);
    isExistingFood = existingFood && existingFood.x === newFood.x && newFood.y;
  } while (isSnake !== -1 || isExistingFood);

  return newFood;
};

export const createBigFood = (
  snake: ISnakePart[],
  existingFood: IFood | null,
): {
  bigFood: IFood | null;
  timeToRemoveBigFood: number;
} => ({
  bigFood: createFood(snake, existingFood),
  timeToRemoveBigFood: 100,
});

export const getLevel = (currentLevel: number, score: number): number => {
  if (score % 20 === 0 && currentLevel < MAX_LEVEL) {
    return currentLevel + 1;
  }
  return currentLevel;
};

export const checkBigFood = (
  bigFood: IFood | null,
  timeToRemoveBigFood: number,
): {
  bigFood: IFood | null;
  timeToRemoveBigFood: number;
} => {
  if (timeToRemoveBigFood > 0) {
    return {
      timeToRemoveBigFood: timeToRemoveBigFood - 1,
      bigFood,
    };
  }
  return {
    timeToRemoveBigFood: 0,
    bigFood: null,
  };
};

export const isDead = (head: ISnakeCoordinate, snake: ISnakePart[]): boolean => (
  !!snake.slice(0, -1).find(({ x, y }) => head.x === x && head.y === y)
);

export const createSnake = (): ISnakePart[] => {
  const x = getRandom(0, BOARD_WIDTH_ITEMS_COUNT - 1);
  const y = getRandom(0, BOARD_HEIGHT_ITEMS_COUNT - 1);
  const snake: ISnakePart[] = [{ x, y, direction: Direction.RIGHT }];

  for (let i = 0; i < 3; i += 1) {
    const last = getLast(snake);

    snake.push({
      x: getNextXCoordinate(last.x),
      y: last.y,
      direction: Direction.RIGHT,
    });
  }

  return snake;
};
