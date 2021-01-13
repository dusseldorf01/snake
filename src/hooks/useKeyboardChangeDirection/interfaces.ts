import { Dispatch } from 'react';
import {
  GameStatus,
  IGameReducerAction,
} from '@/game/interfaces';

export interface IUseKeyboardChangeDirection {
  dispatch: Dispatch<IGameReducerAction>;
  keyDown: string;
  keyLeft: string;
  keyRight: string;
  keyUp: string;
  number: number;
  status: GameStatus;
  trueCondition: boolean;
}
