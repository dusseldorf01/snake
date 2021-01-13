import { memo } from 'react';
import maps from '@/game/maps';
import { IGameSettingSelect } from './interfaces';

const GameSettingsSelect = ({
  onChange,
  value,
}: IGameSettingSelect) => (
  <select
    className="game-settings__select"
    onChange={onChange}
    value={value}
  >
    {maps.map((_, index) => (
      <option
        key={`${index + 1}`}
        value={index}
      >
        {`Карта ${index + 1}`}
      </option>
    ))}
  </select>
);

export default memo(GameSettingsSelect);
