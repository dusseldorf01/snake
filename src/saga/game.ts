import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import type { Effect } from '@redux-saga/types';
import gameSelector from '@/selectors/game';
import {
  ateBigFood,
  ateFood,
  changeGameStatus,
  changeLevel,
  getNextTick,
  getStateFromStorage,
  restartGame,
  setLastDirection,
  setSnake,
  setState,
  updateBigFood,
} from '@/actions/game';
import saveStateInLocalStorage from '@/utils/game/saveStateInLocalStorage';
import {
  GameReducerType,
  GameStatus,
  IAteFoodPayload,
  IGameState,
} from '@/game/interfaces';
import maps from '@/game/maps';
import checkBigFood from '@/utils/game/checkBigFood';
import getSnakeNextTick from '@/utils/game/getSnakeNextTick';
import {
  Direction,
  IFood,
  ISnakePart,
  IWall,
} from '@/lib/Painter/interfaces';
import isFieldFilled from '@/utils/game/isFieldFilled';
import getLevel from '@/utils/game/getLevel';
import getMaxItem from '@/utils/getMaxItem';
import createFood from '@/utils/game/createFood';
import gameConfig from '@/game/config';
import createBigFood from '@/utils/game/createBigFood';

const {
  LOCAL_STORAGE_KEY,
  POINTS_FOR_BIG_FOOD,
} = gameConfig;

function* snakeTickSaga(
  bigFood: IFood | null,
  direction: Direction,
  food: IFood,
  index: number,
  snake: ISnakePart[],
  otherSnake: ISnakePart[] | null,
  walls: IWall[],
) {
  const snakeNextTick: ReturnType<typeof getSnakeNextTick> = yield call<typeof getSnakeNextTick>(
    getSnakeNextTick,
    bigFood,
    direction,
    food,
    snake,
    walls,
  );
  const {
    isDead,
    snake: newSnake,
  } = snakeNextTick;

  yield put(setLastDirection(index));

  if (isDead) {
    yield put(changeGameStatus(GameStatus.IS_OVER));
    return { isDead: true };
  }

  if (otherSnake !== null) {
    if (otherSnake.find((snake1) => newSnake.find((snake2) => (
      snake1.x === snake2.x && snake1.y === snake2.y
    )))) {
      yield put(changeGameStatus(GameStatus.IS_OVER));
      return { isDead: true };
    }
  }

  return {
    ...snakeNextTick,
  };
}

function* nextTickSaga() {
  const state: IGameState = yield select(gameSelector);
  const {
    bigFood,
    direction,
    food,
    map: mapIndex,
    multiplayer,
    snake,
    timeToRemoveBigFood,
  } = state;
  let snake2: ISnakePart[] = [];
  let ate2 = false;
  let ateBigFood2 = false;

  const map = maps[mapIndex];

  const {
    bigFood: newBigFood,
    timeToRemoveBigFood: newTimeToRemoveBigFood,
  } = yield call(checkBigFood, bigFood, timeToRemoveBigFood);

  if (bigFood !== null) {
    yield put(updateBigFood({ bigFood: newBigFood, timeToRemoveBigFood: newTimeToRemoveBigFood }));
  }

  const {
    ate: ate1,
    ateBigFood: ateBigFood1,
    isDead: isDead1,
    snake: snake1,
  } = yield call(snakeTickSaga, bigFood, direction[0], food, 0, snake[0], null, map);

  if (isDead1) {
    return;
  }

  if (multiplayer) {
    const snake2Tick = yield call(
      snakeTickSaga,
      bigFood,
      direction[1],
      food,
      1,
      snake[1],
      snake1,
      map,
    );
    const isDead2 = snake2Tick.isDead;
    snake2 = snake2Tick.snake;
    ate2 = snake2Tick.ate;
    ateBigFood2 = snake2Tick.ateBigFood;

    if (isDead2) {
      return;
    }

    yield put(setSnake({ index: 1, snake: snake2 }));
  }

  yield put(setSnake({ index: 0, snake: snake1 }));

  const newSnakes = [...snake1, ...snake2];

  if (isFieldFilled(newSnakes, map)) {
    yield put(changeGameStatus(GameStatus.PASSED));
    return;
  }

  const newFood = yield createFood(newSnakes, newBigFood, map);

  if (ate1) {
    yield put(ateFood({ index: 0, newFood }));
  }

  if (ate2) {
    yield put(ateFood({ index: 1, newFood }));
  }

  if (ateBigFood1) {
    yield put(ateBigFood(0));
  }

  if (ateBigFood2) {
    yield put(ateBigFood(1));
  }
}

function* updateLevel() {
  const state: IGameState = yield select(gameSelector);
  const {
    changingLevel,
    level,
    score,
    startLevel,
  } = state;

  if (changingLevel) {
    const newLevel = yield call(getLevel, level, startLevel, getMaxItem(score));

    yield put(changeLevel(newLevel));
  }
}

function* checkNeedToBigFood(action: Effect<GameReducerType, IAteFoodPayload>) {
  const { index } = action.payload;
  const state: IGameState = yield select(gameSelector);
  const {
    bigFood,
    food,
    map,
    score,
    snake,
  } = state;

  if (score[index] % POINTS_FOR_BIG_FOOD === 0 && bigFood === null) {
    yield put(updateBigFood(createBigFood(snake.flat(), food, maps[map])));
  }
}

function* removeBigFood() {
  yield put(updateBigFood({ bigFood: null, timeToRemoveBigFood: 0 }));
}

function* saveInLocalStorage() {
  const state: IGameState = yield select(gameSelector);

  yield call(saveStateInLocalStorage, state);
}

function* getStateFromLocalStorage() {
  const stateFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (stateFromLocalStorage !== null) {
    const state = JSON.parse(stateFromLocalStorage) as Omit<IGameState, 'status'>;

    yield put(setState({ ...state, status: GameStatus.ON_PAUSE }));
  }
}

export default function* gameSaga() {
  yield takeEvery(getNextTick, nextTickSaga);

  yield takeEvery(ateFood, checkNeedToBigFood);

  yield takeEvery(ateBigFood, removeBigFood);

  yield takeEvery([ateFood, ateBigFood], updateLevel);

  yield takeEvery([changeGameStatus, restartGame], saveInLocalStorage);

  yield takeEvery(getStateFromStorage, getStateFromLocalStorage);
}
