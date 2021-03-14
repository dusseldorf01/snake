import {
  IGameState,
  GameStatus,
} from '@/game/interfaces';
import gameConfig from '@/game/config';

const { LOCAL_STORAGE_KEY } = gameConfig;

const saveStateInLocalStorage = ({
  status,
  ...otherState
}: IGameState) => {
  if (status === GameStatus.RUNNING) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(otherState));
  }

  if (status === GameStatus.IS_OVER || status === GameStatus.PASSED) {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
};

export default saveStateInLocalStorage;
