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
} = gameConfig;

const getInitialGameState = (): IGameState => {
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
