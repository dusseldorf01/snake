import type { ChangeEvent } from 'react';

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
