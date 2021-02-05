import {
  GameStatus,
  IGameState,
} from '@/game/interfaces';
import gameConfig from '@/game/config';
import maps from '@/game/maps';
import createSnake from '@/utils/game/createSnake';
import { Direction } from '@/lib/Painter/interfaces';
import createFood from '@/utils/game/createFood';

const {
  INITIAL_LEVEL,
  INITIAL_MAP,
  LOCAL_STORAGE_KEY,
} = gameConfig;

const getInitialGameState = (): IGameState => {
  const stateFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (stateFromStorage !== null) {
    return {
      ...JSON.parse(stateFromStorage) as Omit<IGameState, 'status'>,
      status: GameStatus.ON_PAUSE,
    };
  }

  const map = maps[INITIAL_MAP];
  const snake = createSnake(map);

  return {
    bigFood: null,
    changingLevel: false,
    direction: [Direction.RIGHT],
    food: createFood(snake, null, map),
    lastDirection: [Direction.RIGHT],
    level: INITIAL_LEVEL,
    map: INITIAL_MAP,
    multiplayer: false,
    score: [0],
    snake: [snake],
    startLevel: INITIAL_LEVEL,
    status: GameStatus.WAITING_FOR_START,
    timeToRemoveBigFood: 0,
  };
};

export default getInitialGameState;
