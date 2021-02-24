import {
  ChangeEvent,
  useCallback,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  changeChangingLevel,
  changeLevel,
  changeMap,
  changeMultiplayer,
} from '@/actions/game';
import gameSelector from '@/selectors/game';
import GameSettingsSelect from './GameSettingsSelect';
import GameSettingsInput from './GameSettingsInput';
import GameSettingsCheckbox from './GameSettingsCheckbox';
import css from './index.css';

const GameSettings = () => {
  const dispatch = useDispatch();
  const {
    changingLevel,
    level,
    map,
    multiplayer,
  } = useSelector(gameSelector);

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
