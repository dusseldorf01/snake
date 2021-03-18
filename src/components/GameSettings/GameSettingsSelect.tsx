import { memo } from 'react';
import maps from '@/game/maps';
import type { IGameSettingSelect } from './interfaces';
import css from './index.css';

const GameSettingsSelect = ({
  onChange,
  value,
}: IGameSettingSelect) => (
  <select
    aria-label="Выбрать карту"
    className={css.gameSettingsSelect}
    name="map"
    onChange={onChange}
    value={value}
  >
    {maps.map((_, index) => (
      <option
        key={`map-option-${index + 1}`}
        value={index}
      >
        {`Карта ${index + 1}`}
      </option>
    ))}
  </select>
);

export default memo(GameSettingsSelect);
