import type {
  ChangeEvent,
  Dispatch,
} from 'react';
import type { IGameReducerAction } from '@/game/interfaces';

export interface IGameSettings {
  changingLevel: boolean;
  dispatch: Dispatch<IGameReducerAction>;
  level: number;
  map: number;
  multiplayer: boolean;
}

export interface IGameSettingSelect {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: number;
}

export interface IGameSettingsInput {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}

export interface IGameSettingsCheckbox {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}
