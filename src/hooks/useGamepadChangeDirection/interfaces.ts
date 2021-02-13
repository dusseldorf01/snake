import type { Dispatch } from 'react';
import {
  GameStatus,
  IGameReducerAction,
} from '@/game/interfaces';

export interface IUseGamepadChangeDirection {
  dispatch: Dispatch<IGameReducerAction>;
  number: number;
  status: GameStatus;
  trueCondition: boolean;
}
