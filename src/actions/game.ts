import { createAction } from '@reduxjs/toolkit';
import {
  GameReducerType,
  GameStatus,
  IAteFoodPayload,
  ISetSnakePayload,
  IUpdateBigFoodPayload,
} from '@/game/interfaces';

export const ateBigFood = createAction<number, GameReducerType>(
  GameReducerType.ATE_BIG_FOOD,
);

export const ateFood = createAction<IAteFoodPayload, GameReducerType>(
  GameReducerType.ATE_FOOD,
);

export const changeChangingLevel = createAction<boolean, GameReducerType>(
  GameReducerType.CHANGE_CHANGING_LEVEL,
);

export const changeGameStatus = createAction<GameStatus, GameReducerType>(
  GameReducerType.CHANGE_GAME_STATUS,
);

export const changeLevel = createAction<number, GameReducerType>(
  GameReducerType.CHANGE_LEVEL,
);

export const changeMap = createAction<number, GameReducerType>(
  GameReducerType.CHANGE_MAP,
);

export const changeMultiplayer = createAction<boolean, GameReducerType>(
  GameReducerType.CHANGE_MULTIPLAYER,
);

export const goToBottom = createAction<number, GameReducerType>(
  GameReducerType.GO_TO_BOTTOM,
);

export const goToLeft = createAction<number, GameReducerType>(
  GameReducerType.GO_TO_LEFT,
);

export const goToRight = createAction<number, GameReducerType>(
  GameReducerType.GO_TO_RIGHT,
);

export const goToTop = createAction<number, GameReducerType>(
  GameReducerType.GO_TO_TOP,
);

export const getNextTick = createAction<undefined, GameReducerType>(
  GameReducerType.NEXT_TICK,
);

export const restartGame = createAction<undefined, GameReducerType>(
  GameReducerType.RESTART_GAME,
);

export const setLastDirection = createAction<number, GameReducerType>(
  GameReducerType.SET_LAST_DIRECTION,
);

export const setSnake = createAction<ISetSnakePayload, GameReducerType>(
  GameReducerType.SET_SNAKE,
);

export const updateBigFood = createAction<IUpdateBigFoodPayload, GameReducerType>(
  GameReducerType.UPDATE_BIG_FOOD,
);
