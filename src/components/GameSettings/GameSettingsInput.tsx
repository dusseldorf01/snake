import { memo } from 'react';
import { IGameSettingsInput } from '@/components/GameSettings/interfaces';
import gameConfig from '@/game/config';

const {
  MAX_LEVEL,
} = gameConfig;

const GameSettingsInput = ({
  onChange,
  value,
}: IGameSettingsInput) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className="game-settings-input">
    Уровень:
    <input
      type="number"
      min={1}
      max={MAX_LEVEL}
      onChange={onChange}
      value={value}
    />
  </label>
);

export default memo(GameSettingsInput);
