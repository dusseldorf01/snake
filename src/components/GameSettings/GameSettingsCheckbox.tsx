import { memo } from 'react';
import type { IGameSettingsCheckbox } from '@/components/GameSettings/interfaces';
import css from './index.css';

const GameSettingsCheckbox = ({
  label,
  name,
  onChange,
  value,
}: IGameSettingsCheckbox) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={css.gameSettingsCheckbox}>
    <input
      checked={value}
      className={css.gameSettingsCheckboxInput}
      name={name}
      type="checkbox"
      onChange={onChange}
    />
    {label}
  </label>
);

export default memo(GameSettingsCheckbox);
