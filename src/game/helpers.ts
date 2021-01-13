import {
  Direction,
  IFood,
  ISnakeCoordinate,
  ISnakePart,
} from '@/lib/Painter/interfaces';
import getRandom from '@/utils/getRandom';
import getLast from '@/utils/getLast';
import { WallType } from './maps/interfaces';
import maps from './maps';
import gameConfig from './config';
import {
  GameStatus,
  IGameState,
} from './interfaces';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
  LEVEL_SCORE_CHANGING,
  LOCAL_STORAGE_KEY,
  MAX_LEVEL,
  TICKS_TO_REMOVE_BIG_FOOD,
} = gameConfig;

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

export const createFood = (
  snake: ISnakePart[],
  existingFood: IFood | null,
  walls: WallType[],
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
    isWall = !!walls.find(({ x, y }) => x === newFood.x && y === newFood.y);
  } while (isSnake !== -1 || isExistingFood || isWall);

  return newFood;
};

export const createBigFood = (
  snake: ISnakePart[],
  existingFood: IFood | null,
  walls: WallType[],
): {
  bigFood: IFood | null;
  timeToRemoveBigFood: number;
} => ({
  bigFood: createFood(snake, existingFood, walls),
  timeToRemoveBigFood: TICKS_TO_REMOVE_BIG_FOOD,
});

export const getLevel = (currentLevel: number, startLevel: number, score: number): number => {
  if (score === 0 || currentLevel >= MAX_LEVEL) {
    return currentLevel;
  }
  if (score >= (currentLevel - startLevel + 1) * LEVEL_SCORE_CHANGING) {
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

export const createSnake = (walls: WallType[], existingSnake: ISnakePart[] = []): ISnakePart[] => {
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

export const isBumpIntoWall = ({
  x,
  y,
}: ISnakeCoordinate, walls: WallType[]) => (
  !!walls.find((w) => w.x === x && w.y === y)
);

export const createGameState = (
  changingLevel: boolean = false,
  mapIndex: number = 0,
  multiplayer: boolean = false,
  startLevel: number = 3,
): IGameState => {
  const map = maps[mapIndex];
  const snake1 = createSnake(map);
  const commonState: Omit<IGameState, 'direction' | 'food' | 'lastDirection' | 'score' | 'snake'> = {
    bigFood: null,
    changingLevel,
    level: startLevel,
    map: mapIndex,
    multiplayer,
    startLevel,
    status: GameStatus.WAITING_FOR_START,
    timeToRemoveBigFood: 0,
  };

  if (multiplayer) {
    const snake2 = createSnake(map, snake1);
    return {
      ...commonState,
      direction: [Direction.RIGHT, Direction.RIGHT],
      food: createFood([snake1, snake2].flat(), null, map),
      lastDirection: [Direction.RIGHT, Direction.RIGHT],
      score: [0, 0],
      snake: [snake1, snake2],
    };
  }

  return {
    ...commonState,
    direction: [Direction.RIGHT],
    food: createFood(snake1, null, map),
    lastDirection: [Direction.RIGHT],
    score: [0],
    snake: [snake1],
  };
};

export const getInitialGameState = (): IGameState => {
  const stateFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (stateFromStorage !== null) {
    return {
      ...JSON.parse(stateFromStorage) as Omit<IGameState, 'status'>,
      status: GameStatus.ON_PAUSE,
    };
  }

  return createGameState();
};
