import { memo } from 'react';
import { IGameSettingsCheckbox } from '@/components/GameSettings/interfaces';

const GameSettingsCheckbox = ({
  label,
  name,
  onChange,
  value,
}: IGameSettingsCheckbox) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className="game-settings-checkbox">
    <input
      checked={value}
      className="game-settings-checkbox__input"
      name={name}
      type="checkbox"
      onChange={onChange}
    />
    {label}
  </label>
);

export default memo(GameSettingsCheckbox);
