import { memo } from 'react';
import { IGameSettingsCheckbox } from '@/components/GameSettings/interfaces';

const GameSettingsCheckbox = ({
  label,
  onChange,
  value,
}: IGameSettingsCheckbox) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className="game-settings-checkbox">
    <input
      checked={value}
      className="game-settings-checkbox__input"
      type="checkbox"
      onChange={onChange}
    />
    {label}
  </label>
);

export default memo(GameSettingsCheckbox);
