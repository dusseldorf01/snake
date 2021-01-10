import { Dispatch } from 'react';
import {
  GameStatus,
  IGameReducerAction,
} from '@/pages/Game/reducer';

export interface IUseKeyboardChangeDirection {
  dispatch: Dispatch<IGameReducerAction>;
  keyDown: string;
  keyLeft: string;
  keyRight: string;
  keyUp: string;
  status: GameStatus;
}
