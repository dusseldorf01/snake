import { createAction } from '@reduxjs/toolkit';
import {
  GameReducerType,
  GameStatus,
} from '@/game/interfaces';

const goToTop = createAction<number, GameReducerType>(
  GameReducerType.GO_TO_TOP,
);

const goToBottom = createAction<number, GameReducerType>(
  GameReducerType.GO_TO_BOTTOM,
);

const goToRight = createAction<number, GameReducerType>(
  GameReducerType.GO_TO_RIGHT,
);

const goToLeft = createAction<number, GameReducerType>(
  GameReducerType.GO_TO_LEFT,
);

const getNextTick = createAction<undefined, GameReducerType>(
  GameReducerType.NEXT_TICK,
);

const changeGameStatus = createAction<GameStatus, GameReducerType>(
  GameReducerType.CHANGE_GAME_STATUS,
);

const restartGame = createAction<undefined, GameReducerType>(
  GameReducerType.RESTART_GAME,
);

const changeMap = createAction<number, GameReducerType>(
  GameReducerType.CHANGE_MAP,
);

const changeLevel = createAction<number, GameReducerType>(
  GameReducerType.CHANGE_LEVEL,
);

const changeChangingLevel = createAction<boolean, GameReducerType>(
  GameReducerType.CHANGE_CHANGING_LEVEL,
);

const changeMultiplayer = createAction<boolean, GameReducerType>(
  GameReducerType.CHANGE_MULTIPLAYER,
);

export default {
  changeChangingLevel,
  changeGameStatus,
  changeLevel,
  changeMap,
  changeMultiplayer,
  getNextTick,
  goToBottom,
  goToLeft,
  goToRight,
  goToTop,
  restartGame,
};
