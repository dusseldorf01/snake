import { memo } from 'react';
import type { IGameSettingsInput } from '@/components/GameSettings/interfaces';
import gameConfig from '@/game/config';
import css from './index.css';

const {
  MAX_LEVEL,
} = gameConfig;

const GameSettingsInput = ({
  onChange,
  value,
}: IGameSettingsInput) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={css.gameSettingsInput}>
    Уровень:
    <input
      type="number"
      min={1}
      max={MAX_LEVEL}
      name="level"
      onChange={onChange}
      value={value}
    />
  </label>
);

export default memo(GameSettingsInput);
