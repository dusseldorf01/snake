import { Dispatch } from 'react';
import {
  GameStatus,
  IGameReducerAction,
} from '@/pages/Game/reducer';

export interface IUseGameAnimation {
  dispatch: Dispatch<IGameReducerAction>;
  level: number;
  status: GameStatus;
}
