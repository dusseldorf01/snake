import { Reducer } from 'react';
import {
  Direction,
  IFood,
  ISnakePart,
} from '@/lib/Painter/interfaces';
import getLast from '@/utils/getLast';
import gameParams from '@/gameParams';
import {
  checkBigFood,
  checkReadyToEat,
  createBigFood,
  createFood,
  createSnake,
  getLevel,
  getNewSnakePart,
  isDead,
} from '@/pages/Game/helpers';

const {
  boardHeightItemsCount,
  boardWidthItemsCount,
} = gameParams;

export enum GameStatus {
  WAITING_FOR_START = 'WAITING_FOR_START',
  RUNNING = 'RUNNING',
  ON_PAUSE = 'ON_PAUSE',
  IS_OVER = 'IS_OVER',
  PASSED = 'PASSED',
}

export interface IGameState {
  bigFood: null | IFood;
  changingLevel: boolean;
  direction: Direction;
  food: IFood;
  level: number;
  score: number;
  snake: ISnakePart[];
  status: GameStatus;
  timeToRemoveBigFood: number;
}

export enum GameReducerType {
  CHANGE_DIRECTION,
  CHANGE_GAME_STATUS,
  NEXT_TICK,
  RESTART_GAME,
}

export interface IGameReducerAction {
  type: GameReducerType;
  payload?: Direction | GameStatus;
}

const initialSnake = createSnake();

export const initialGameState: IGameState = {
  bigFood: null,
  changingLevel: false,
  direction: Direction.RIGHT,
  food: createFood(initialSnake, null),
  level: 3,
  score: 0,
  snake: initialSnake,
  status: GameStatus.WAITING_FOR_START,
  timeToRemoveBigFood: 0,
};

export const gameReducer: Reducer<IGameState, IGameReducerAction> = (
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
    level,
    score,
    snake,
    timeToRemoveBigFood,
  } = state;

  switch (type) {
    case GameReducerType.CHANGE_DIRECTION: {
      switch (payload) {
        case Direction.RIGHT:
          return (
            direction !== Direction.LEFT && direction !== Direction.RIGHT ? (
              { ...state, direction: payload }
            ) : (
              state
            )
          );
        case Direction.LEFT:
          return (
            direction !== Direction.RIGHT && direction !== Direction.LEFT ? (
              { ...state, direction: payload }
            ) : (
              state
            )
          );
        case Direction.TOP:
          return (
            direction !== Direction.BOTTOM && direction !== Direction.TOP ? (
              { ...state, direction: payload }
            ) : (
              state
            )
          );
        case Direction.BOTTOM:
          return (
            direction !== Direction.TOP && direction !== Direction.BOTTOM ? (
              { ...state, direction: payload }
            ) : (
              state
            )
          );
        default:
          throw new Error('Unknown direction');
      }
    }
    case GameReducerType.CHANGE_GAME_STATUS: {
      return {
        ...state,
        status: payload as GameStatus,
      };
    }
    case GameReducerType.NEXT_TICK: {
      const newSnake = snake.slice();
      const lastPart = getLast(newSnake);
      const newHead: ISnakePart = getNewSnakePart(direction, lastPart);

      newSnake.push(checkReadyToEat(newHead, food, bigFood));

      if (newHead.x === food.x && newHead.y === food.y) {
        newHead.eaten = true;

        const newScore = score + 1;

        const existOrNeedToCreateBigFood = newScore % 5 === 0 || timeToRemoveBigFood > 0;

        const boardItemsCount = boardHeightItemsCount * boardWidthItemsCount;

        if (!existOrNeedToCreateBigFood && newSnake.length === boardItemsCount) {
          return {
            ...state,
            score: newScore,
            status: GameStatus.PASSED,
          };
        }

        if (existOrNeedToCreateBigFood && newSnake.length === boardItemsCount) {
          return {
            ...state,
            score: newScore + 5,
            status: GameStatus.PASSED,
          };
        }

        const newFood = createFood(newSnake, bigFood);

        if (isDead(newHead, newSnake)) {
          return {
            ...state,
            score: newScore,
            status: GameStatus.IS_OVER,
          };
        }

        return {
          ...state,
          food: newFood,
          level: changingLevel ? getLevel(level, newScore) : level,
          score: newScore,
          snake: newSnake,
          ...(
            newScore % 5 === 0 ? (
              createBigFood(newSnake, newFood)
            ) : (
              checkBigFood(bigFood, timeToRemoveBigFood)
            )
          ),
        };
      }
      if (bigFood && newHead.x === bigFood.x && newHead.y === bigFood.y) {
        newHead.eaten = true;

        const newScore = score + 5;

        if (isDead(newHead, newSnake)) {
          return {
            ...state,
            score: newScore,
            status: GameStatus.IS_OVER,
          };
        }

        return {
          ...state,
          bigFood: null,
          level: changingLevel ? getLevel(level, newScore) : level,
          score: newScore,
          snake: newSnake,
          timeToRemoveBigFood: 0,
        };
      }

      if (isDead(newHead, newSnake.slice(1))) {
        return {
          ...state,
          status: GameStatus.IS_OVER,
        };
      }

      return {
        ...state,
        ...checkBigFood(bigFood, timeToRemoveBigFood),
        snake: newSnake.slice(1),
      };
    }
    case GameReducerType.RESTART_GAME: {
      const newSnake = createSnake();
      const newFood = createFood(newSnake, null);

      return {
        ...initialGameState,
        food: newFood,
        snake: newSnake,
        status: GameStatus.RUNNING,
      };
    }
    default:
      throw new Error('Unknown reducer type');
  }
};
