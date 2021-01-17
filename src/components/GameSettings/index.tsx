import {
  ChangeEvent,
  useCallback,
} from 'react';
import { GameReducerType } from '@/game/interfaces';
import GameSettingsSelect from './GameSettingsSelect';
import GameSettingsInput from './GameSettingsInput';
import GameSettingsCheckbox from './GameSettingsCheckbox';
import type { IGameSettings } from './interfaces';
import css from './index.css';

const GameSettings = ({
  changingLevel,
  dispatch,
  level,
  map,
  multiplayer,
}: IGameSettings) => {
  const selectMap = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: GameReducerType.CHANGE_MAP,
      payload: Number(e.target.value),
    });
  }, []);
  const changeLevel = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: GameReducerType.CHANGE_LEVEL,
      payload: Number(e.target.value),
    });
  }, []);
  const changeChangingLevel = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: GameReducerType.CHANGE_CHANGING_LEVEL,
      payload: e.target.checked,
    });
  }, []);
  const changeMultiplayer = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: GameReducerType.CHANGE_MULTIPLAYER,
      payload: e.target.checked,
    });
  }, []);

  return (
    <div className={css.gameSettings}>
      <GameSettingsSelect
        onChange={selectMap}
        value={map}
      />
      <GameSettingsInput
        onChange={changeLevel}
        value={level}
      />
      <GameSettingsCheckbox
        label="Увеличивать уровень"
        onChange={changeChangingLevel}
        value={changingLevel}
      />
      <GameSettingsCheckbox
        label="Мультиплеер"
        onChange={changeMultiplayer}
        value={multiplayer}
      />
    </div>
  );
};

export default GameSettings;
