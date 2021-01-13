import { Direction, IFood, ISnakePart } from '@/lib/Painter/interfaces';

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
  direction: Direction[];
  food: IFood;
  lastDirection: Direction[];
  level: number;
  map: number;
  multiplayer: boolean;
  score: number[];
  snake: ISnakePart[][];
  startLevel: number;
  status: GameStatus;
  timeToRemoveBigFood: number;
}

export enum GameReducerType {
  CHANGE_CHANGING_LEVEL,
  CHANGE_DIRECTION,
  CHANGE_GAME_STATUS,
  CHANGE_LEVEL,
  CHANGE_MAP,
  CHANGE_MULTIPLAYER,
  NEXT_TICK,
  RESTART_GAME,
}

export interface IGameReducerAction {
  type: GameReducerType;
  payload?: any;
}
