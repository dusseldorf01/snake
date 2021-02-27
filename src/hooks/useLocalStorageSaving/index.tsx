import { useEffect } from 'react';
import {
  GameStatus,
  IGameState,
} from '@/game/interfaces';
import gameConfig from '@/game/config';

const {
  LOCAL_STORAGE_KEY,
} = gameConfig;

const useLocalStorageSaving = ({
  status,
  ...otherState
}: IGameState) => {
  useEffect(() => {
    if (status === GameStatus.RUNNING) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(otherState));
    }

    if (status === GameStatus.IS_OVER || status === GameStatus.PASSED) {
      if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  });
};

export default useLocalStorageSaving;
