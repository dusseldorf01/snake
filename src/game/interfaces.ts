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
  CHANGE_CHANGING_LEVEL = 'CHANGE_CHANGING_LEVEL',
  CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS',
  CHANGE_LEVEL = 'CHANGE_LEVEL',
  CHANGE_MAP = 'CHANGE_MAP',
  CHANGE_MULTIPLAYER = 'CHANGE_MULTIPLAYER',
  GO_TO_TOP = 'GO_TO_TOP',
  GO_TO_BOTTOM = 'GO_TO_BOTTOM',
  GO_TO_LEFT = 'GO_TO_LEFT',
  GO_TO_RIGHT = 'GO_TO_RIGHT',
  NEXT_TICK = 'NEXT_TICK',
  RESTART_GAME = 'RESTART_GAME',
}

export interface IGameReducerAction {
  type: GameReducerType;
  payload?: any;
}
