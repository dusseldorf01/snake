import type { Reducer } from 'react';
import { Direction, IFood, ISnakePart } from '@/lib/Painter/interfaces';
import getLast from '@/utils/getLast';
import getMaxItem from '@/utils/getMaxItem';
import areEqualArrays from '@/utils/areEqualArrays';
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
  dir: Direction,
  number: number,
  direction: Direction[],
  lastDirection: Direction,
  state: IGameState,
): IGameState => {
  if (dir === direction[number]) {
    return state;
  }

  const newDirection = direction.slice();
  newDirection[number] = dir;

  switch (dir) {
    case Direction.RIGHT:
      return (
        lastDirection !== Direction.LEFT ? (
          { ...state, direction: newDirection }
        ) : (
          state
        )
      );
    case Direction.LEFT:
      return (
        lastDirection !== Direction.RIGHT ? (
          { ...state, direction: newDirection }
        ) : (
          state
        )
      );
    case Direction.TOP:
      return (
        lastDirection !== Direction.BOTTOM ? (
          { ...state, direction: newDirection }
        ) : (
          state
        )
      );
    case Direction.BOTTOM:
      return (
        lastDirection !== Direction.TOP ? (
          { ...state, direction: newDirection }
        ) : (
          state
        )
      );
    default:
      throw new Error('Unknown direction');
  }
};

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

  if (food !== null && newHead.x === food.x && newHead.y === food.y) {
    newHead.eaten = true;

    return {
      ate: true,
      ateBigFood: false,
      isDead: isDead(newHead, newSnake),
      snake: newSnake,
    };
  }

  if (bigFood !== null && newHead.x === bigFood.x && newHead.y === bigFood.y) {
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

const gameReducer: Reducer<IGameState, IGameReducerAction> = (
  state, {
    payload,
    type,
  },
): IGameState => {
  const {
    bigFood,
    changingLevel,
    direction,
    food,
    lastDirection,
    level,
    map: mapIndex,
    multiplayer,
    score,
    snake,
    startLevel,
    timeToRemoveBigFood,
  } = state;

  const map = maps[mapIndex];

  switch (type) {
    case GameReducerType.CHANGE_CHANGING_LEVEL: {
      return {
        ...state,
        changingLevel: payload,
      };
    }
    case GameReducerType.CHANGE_DIRECTION: {
      const {
        dir,
        number,
      } = payload;
      return changeDirection(dir, number, direction, lastDirection[number], state);
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
      let needToChangeSnake: boolean = false;
      const newSnake = snake.slice();
      const newMap = maps[payload];

      const isWall = (x: number, y: number) => (
        !!newMap.find((w) => w.x === x && w.y === y)
      );

      snake.forEach((sn, index) => {
        if (sn.some(({ x, y }) => (
          isWall(x, y) || isWall(x + 1, y) || isWall(x + 2, y) || isWall(x + 3, y)
          || isWall(x + 4, y)
        ))) {
          needToChangeSnake = true;
          if (index === 0) {
            newSnake[0] = createSnake(newMap, newSnake[1] || []);
          } else {
            newSnake[1] = createSnake(newMap, newSnake[0]);
          }
        }
      });

      const newSn = needToChangeSnake ? newSnake : snake;

      return {
        ...state,
        food: needToChangeSnake || isWall(food.x, food.y) ? (
          createFood(newSn.flat(), null, newMap)
        ) : food,
        map: payload,
        snake: newSn,
      };
    }
    case GameReducerType.CHANGE_MULTIPLAYER: {
      let variableState: Partial<IGameState> = {};

      if (payload) {
        variableState = {
          direction: [...direction, Direction.RIGHT],
          score: [0, 0],
          snake: [...snake, createSnake(map, snake[0])],
        };
      } else {
        variableState = {
          direction: [direction[0]],
          score: [0],
          snake: [snake[0]],
        };
      }

      return {
        ...state,
        ...variableState,
        multiplayer: payload,
      };
    }
    case GameReducerType.NEXT_TICK: {
      const newLastDirection = lastDirection.slice();
      const newSnake = snake.slice();
      const newScore = score.slice();
      const {
        bigFood: newBigFood,
        timeToRemoveBigFood: newTimeToRemoveBigFood,
      } = checkBigFood(bigFood, timeToRemoveBigFood);
      let newFood = food;
      let needToCreateBigFood = false;
      let ate2 = false;
      let ateBigFood2 = false;

      const {
        ate: ate1,
        ateBigFood: ateBigFood1,
        isDead: isDead1,
        snake: snake1,
      } = getSnakeNextTick(bigFood, direction[0], food, snake[0], map);
      // eslint-disable-next-line prefer-destructuring
      newLastDirection[0] = direction[0];

      if (multiplayer) {
        const snake2NextTick = getSnakeNextTick(bigFood, direction[1], food, snake[1], map);
        ate2 = snake2NextTick.ate;
        ateBigFood2 = snake2NextTick.ateBigFood;
        const snake2 = snake2NextTick.snake;
        const isDead2 = snake2NextTick.isDead;
        // eslint-disable-next-line prefer-destructuring
        newLastDirection[1] = direction[1];

        newSnake[1] = snake2;

        if (isDead2) {
          return {
            ...state,
            status: GameStatus.IS_OVER,
          };
        }

        if (snake1.find((sn1) => snake2.find((sn2) => (
          sn1.x === sn2.x && sn1.y === sn2.y
        )))) {
          return {
            ...state,
            status: GameStatus.IS_OVER,
          };
        }
      }

      newSnake[0] = snake1;

      if (isDead1) {
        return {
          ...state,
          status: GameStatus.IS_OVER,
        };
      }

      const boardItemsCount = BOARD_HEIGHT_ITEMS_COUNT * BOARD_WIDTH_ITEMS_COUNT;

      if (newSnake.flat().length + map.length === boardItemsCount) {
        return {
          ...state,
          status: GameStatus.PASSED,
        };
      }

      if (ate1) {
        newScore[0] += 1;
        newFood = createFood(newSnake.flat(), newBigFood, map);
        needToCreateBigFood = needToCreateBigFood || newScore[0] % POINTS_FOR_BIG_FOOD === 0;
      }

      if (ate2) {
        newScore[1] += 1;
        newFood = createFood(newSnake.flat(), newBigFood, map);
        needToCreateBigFood = needToCreateBigFood || newScore[1] % POINTS_FOR_BIG_FOOD === 0;
      }

      if (ateBigFood1) {
        newScore[0] += BIG_FOOD_POINTS;
      }

      if (ateBigFood2) {
        newScore[1] += BIG_FOOD_POINTS;
      }

      const ate = ate1 || ate2 || ateBigFood1 || ateBigFood2;

      return {
        ...state,
        food: newFood,
        lastDirection: newLastDirection,
        level: ate && changingLevel ? getLevel(level, startLevel, getMaxItem(newScore)) : level,
        score: areEqualArrays(score, newScore) ? score : newScore,
        snake: newSnake,
        ...(
          needToCreateBigFood ? (
            createBigFood(newSnake.flat(), newFood, map)
          ) : ({})
        ),
        ...(
          newBigFood !== null ? ({
            bigFood: newBigFood,
            timeToRemoveBigFood: newTimeToRemoveBigFood,
          }) : ({})
        ),
        ...(
          (ateBigFood1 || ateBigFood2) ? ({
            bigFood: null,
            timeToRemoveBigFood: 0,
          }) : ({})
        ),
      };
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
