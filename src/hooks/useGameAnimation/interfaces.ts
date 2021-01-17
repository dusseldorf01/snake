import type { Dispatch } from 'react';
import {
  GameStatus,
  IGameReducerAction,
} from '@/game/interfaces';

export interface IUseGameAnimation {
  dispatch: Dispatch<IGameReducerAction>;
  level: number;
  status: GameStatus;
}
