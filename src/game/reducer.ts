import type { Reducer } from 'react';
import produce from 'immer';
import { Direction, IFood, ISnakePart } from '@/lib/Painter/interfaces';
import getLast from '@/utils/getLast';
import getMaxItem from '@/utils/getMaxItem';
import {
  GameReducerType,
  GameStatus,
  IGameReducerAction,
  IGameState,
} from './interfaces';
import gameConfig from './config';
import {
  checkBigFood,
  checkReadyToEat,
  createBigFood,
  createFood,
  createGameState,
  createSnake,
  getLevel,
  getNewSnakePart,
  isBumpIntoWall,
  isDead,
} from './helpers';
import maps from './maps';
import type { WallType } from './maps/interfaces';

const {
  BIG_FOOD_POINTS,
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
  POINTS_FOR_BIG_FOOD,
} = gameConfig;

const changeDirection = (
  newDirection: Direction,
  oppositeDirection: Direction,
  number: number,
  state: IGameState,
): IGameState => (
  produce<IGameState>(state, (currentState) => {
    if (
      newDirection !== state.direction[number] && state.lastDirection[number] !== oppositeDirection
    ) {
      // eslint-disable-next-line no-param-reassign
      currentState.direction[number] = newDirection;
    }
  })
);

const getSnakeNextTick = (
  bigFood: IFood | null,
  direction: Direction,
  food: IFood | null,
  snake: ISnakePart[],
  walls: WallType[],
): {
  ate: boolean;
  ateBigFood: boolean;
  isDead: boolean;
  snake: ISnakePart[];
} => {
  const newSnake = snake.slice();
  const lastPart = getLast(newSnake);
  const newHead: ISnakePart = getNewSnakePart(direction, lastPart);

  if (food !== null) {
    newSnake.push(checkReadyToEat(newHead, food, bigFood));
  }

  if (isBumpIntoWall(newHead, walls)) {
    return {
      ate: false,
      ateBigFood: false,
      isDead: true,
      snake: newSnake.slice(1),
    };
  }

  const ateFood = (f: IFood | null) => (
    f !== null && f.x === newHead.x && f.y === newHead.y
  );

  if (ateFood(food)) {
    newHead.eaten = true;

    return {
      ate: true,
      ateBigFood: false,
      isDead: isDead(newHead, newSnake),
      snake: newSnake,
    };
  }

  if (ateFood(bigFood)) {
    newHead.eaten = true;

    return {
      ate: false,
      ateBigFood: true,
      isDead: isDead(newHead, newSnake),
      snake: newSnake,
    };
  }

  return {
    ate: false,
    ateBigFood: false,
    isDead: isDead(newHead, newSnake.slice(1)),
    snake: newSnake.slice(1),
  };
};

const getNextTick = (state: IGameState): IGameState => (
  produce<IGameState>(state, (currentState) => {
    const {
      bigFood,
      changingLevel,
      direction,
      food,
      level,
      map: mapIndex,
      multiplayer,
      snake,
      startLevel,
      timeToRemoveBigFood,
    } = currentState;

    const map = maps[mapIndex];

    const {
      bigFood: newBigFood,
      timeToRemoveBigFood: newTimeToRemoveBigFood,
    } = checkBigFood(bigFood, timeToRemoveBigFood);
    let needToCreateBigFood = false;
    let ate2 = false;
    let ateBigFood2 = false;

    // eslint-disable-next-line no-param-reassign
    currentState.bigFood = newBigFood;
    // eslint-disable-next-line no-param-reassign
    currentState.timeToRemoveBigFood = newTimeToRemoveBigFood;

    const {
      ate: ate1,
      ateBigFood: ateBigFood1,
      isDead: isDead1,
      snake: snake1,
    } = getSnakeNextTick(bigFood, direction[0], food, snake[0], map);

    // eslint-disable-next-line no-param-reassign,prefer-destructuring
    currentState.lastDirection[0] = direction[0];

    if (isDead1) {
      // eslint-disable-next-line no-param-reassign
      currentState.status = GameStatus.IS_OVER;
      return;
    }

    if (multiplayer) {
      const snake2NextTick = getSnakeNextTick(bigFood, direction[1], food, snake[1], map);
      const snake2 = snake2NextTick.snake;
      const isDead2 = snake2NextTick.isDead;
      ate2 = snake2NextTick.ate;
      ateBigFood2 = snake2NextTick.ateBigFood;

      // eslint-disable-next-line no-param-reassign,prefer-destructuring
      currentState.lastDirection[1] = direction[1];

      if (isDead2) {
        // eslint-disable-next-line no-param-reassign
        currentState.status = GameStatus.IS_OVER;
        return;
      }

      if (snake1.find((sn1) => snake2.find((sn2) => (
        sn1.x === sn2.x && sn1.y === sn2.y
      )))) {
        // eslint-disable-next-line no-param-reassign
        currentState.status = GameStatus.IS_OVER;
        return;
      }

      // eslint-disable-next-line no-param-reassign
      currentState.snake[1] = snake2;
    }

    // eslint-disable-next-line no-param-reassign
    currentState.snake[0] = snake1;

    const boardItemsCount = BOARD_HEIGHT_ITEMS_COUNT * BOARD_WIDTH_ITEMS_COUNT;

    if (currentState.snake.flat().length + map.length === boardItemsCount) {
      // eslint-disable-next-line no-param-reassign
      currentState.status = GameStatus.PASSED;
      return;
    }

    if (ate1) {
      // eslint-disable-next-line no-param-reassign
      currentState.score[0] += 1;
      // eslint-disable-next-line no-param-reassign
      currentState.food = createFood(currentState.snake.flat(), currentState.bigFood, map);
      needToCreateBigFood = currentState.score[0] % POINTS_FOR_BIG_FOOD === 0;
    }

    if (ate2) {
      // eslint-disable-next-line no-param-reassign
      currentState.score[1] += 1;
      // eslint-disable-next-line no-param-reassign
      currentState.food = createFood(currentState.snake.flat(), currentState.bigFood, map);
      needToCreateBigFood = currentState.score[1] % POINTS_FOR_BIG_FOOD === 0;
    }

    if (ateBigFood1) {
      // eslint-disable-next-line no-param-reassign
      currentState.score[0] += BIG_FOOD_POINTS;
    }

    if (ateBigFood2) {
      // eslint-disable-next-line no-param-reassign
      currentState.score[1] += BIG_FOOD_POINTS;
    }

    if ((ate1 || ate2 || ateBigFood1 || ateBigFood2) && changingLevel) {
      // eslint-disable-next-line no-param-reassign
      currentState.level = getLevel(level, startLevel, getMaxItem(currentState.score));
    }

    if (currentState.bigFood === null && needToCreateBigFood) {
      const createdBigFood = createBigFood(currentState.snake.flat(), currentState.food, map);
      // eslint-disable-next-line no-param-reassign
      currentState.bigFood = createdBigFood.bigFood;
      // eslint-disable-next-line no-param-reassign
      currentState.timeToRemoveBigFood = createdBigFood.timeToRemoveBigFood;
    }

    if (ateBigFood1 || ateBigFood2) {
      // eslint-disable-next-line no-param-reassign
      currentState.bigFood = null;
      // eslint-disable-next-line no-param-reassign
      currentState.timeToRemoveBigFood = 0;
    }
  })
);

const changeMultiplayer = (state: IGameState, payload: boolean): IGameState => (
  produce(state, (currentState) => {
    const { snake } = currentState;

    // eslint-disable-next-line no-param-reassign
    currentState.multiplayer = payload;

    if (payload) {
      // eslint-disable-next-line no-param-reassign
      currentState.direction = [Direction.RIGHT, Direction.RIGHT];
      // eslint-disable-next-line no-param-reassign
      currentState.score = [0, 0];
      // eslint-disable-next-line no-param-reassign
      currentState.snake = [...snake, createSnake(maps[currentState.map], snake[0])];
    } else {
      // eslint-disable-next-line no-param-reassign
      currentState.direction = [Direction.RIGHT];
      // eslint-disable-next-line no-param-reassign
      currentState.score = [0];
      // eslint-disable-next-line no-param-reassign
      currentState.snake = [snake[0]];
    }
  })
);

const changeMap = (state: IGameState, payload: number) => (
  produce(state, (currentState) => {
    const newMap = maps[payload];

    // eslint-disable-next-line no-param-reassign
    currentState.map = payload;

    const isWall = (x: number, y: number) => (
      !!newMap.find((w) => w.x === x && w.y === y)
    );

    currentState.snake.forEach((snake, index) => {
      if (snake.some(({ x, y }) => (
        isWall(x, y) || isWall(x + 1, y) || isWall(x + 2, y) || isWall(x + 3, y)
        || isWall(x + 4, y)
      ))) {
        if (index === 0) {
          // eslint-disable-next-line no-param-reassign
          currentState.snake[0] = createSnake(newMap, currentState.snake[1] || []);
        } else {
          // eslint-disable-next-line no-param-reassign
          currentState.snake[1] = createSnake(newMap, currentState.snake[0]);
        }

        // eslint-disable-next-line no-param-reassign
        currentState.food = createFood(currentState.snake.flat(), null, newMap);
      }

      if (isWall(currentState.food.x, currentState.food.y)) {
        // eslint-disable-next-line no-param-reassign
        currentState.food = createFood(currentState.snake.flat(), null, newMap);
      }
    });
  })
);

const gameReducer: Reducer<IGameState, IGameReducerAction> = (
  state, {
    payload,
    type,
  },
): IGameState => {
  const {
    changingLevel,
    map: mapIndex,
    multiplayer,
    startLevel,
  } = state;

  switch (type) {
    case GameReducerType.CHANGE_CHANGING_LEVEL: {
      return {
        ...state,
        changingLevel: payload,
      };
    }
    case GameReducerType.CHANGE_GAME_STATUS: {
      return {
        ...state,
        status: payload as GameStatus,
      };
    }
    case GameReducerType.CHANGE_LEVEL: {
      return {
        ...state,
        level: payload,
      };
    }
    case GameReducerType.CHANGE_MAP: {
      return changeMap(state, payload);
    }
    case GameReducerType.CHANGE_MULTIPLAYER: {
      return changeMultiplayer(state, payload);
    }
    case GameReducerType.GO_TO_BOTTOM: {
      return changeDirection(Direction.BOTTOM, Direction.TOP, payload, state);
    }
    case GameReducerType.GO_TO_LEFT: {
      return changeDirection(Direction.LEFT, Direction.RIGHT, payload, state);
    }
    case GameReducerType.GO_TO_RIGHT: {
      return changeDirection(Direction.RIGHT, Direction.LEFT, payload, state);
    }
    case GameReducerType.GO_TO_TOP: {
      return changeDirection(Direction.TOP, Direction.BOTTOM, payload, state);
    }
    case GameReducerType.NEXT_TICK: {
      return getNextTick(state);
    }
    case GameReducerType.RESTART_GAME: {
      return createGameState(
        changingLevel,
        mapIndex,
        multiplayer,
        startLevel,
      );
    }
    default:
      throw new Error('Unknown reducer type');
  }
};

export default gameReducer;
