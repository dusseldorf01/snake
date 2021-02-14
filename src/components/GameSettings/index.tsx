import {
  ChangeEvent,
  useCallback,
} from 'react';
import actions from '@/game/actionCreators';
import GameSettingsSelect from './GameSettingsSelect';
import GameSettingsInput from './GameSettingsInput';
import GameSettingsCheckbox from './GameSettingsCheckbox';
import type { IGameSettings } from './interfaces';
import css from './index.css';

const {
  changeChangingLevel,
  changeLevel,
  changeMap,
  changeMultiplayer,
} = actions;

const GameSettings = ({
  changingLevel,
  dispatch,
  level,
  map,
  multiplayer,
}: IGameSettings) => {
  const changeMapHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeMap(Number(e.target.value)));
  }, []);
  const changeLevelHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLevel(Number(e.target.value)));
  }, []);
  const changeChangingLevelHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeChangingLevel(e.target.checked));
  }, []);
  const changeMultiplayerHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMultiplayer(e.target.checked));
  }, []);

  return (
    <div className={css.gameSettings}>
      <GameSettingsSelect
        onChange={changeMapHandler}
        value={map}
      />
      <GameSettingsInput
        onChange={changeLevelHandler}
        value={level}
      />
      <GameSettingsCheckbox
        label="Увеличивать уровень"
        name="changingLevel"
        onChange={changeChangingLevelHandler}
        value={changingLevel}
      />
      <GameSettingsCheckbox
        label="Мультиплеер"
        name="multiplayer"
        onChange={changeMultiplayerHandler}
        value={multiplayer}
      />
    </div>
  );
};

export default GameSettings;
