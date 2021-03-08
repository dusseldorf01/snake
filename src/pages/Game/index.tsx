import {
  Reducer,
  useReducer,
} from 'react';
import Canvas from '@/components/Canvas';
import {
  GameStatus,
  IGameReducerAction,
  IGameState,
} from '@/game/interfaces';
import gameActions from '@/game/actionCreators';
import gameReducer from '@/game/reducer';
import GameModal from '@/components/GameModal';
import type { IGameModal } from '@/components/GameModal/interfaces';
import useKeyboardChangeDirection from '@/hooks/useKeyboardChangeDirection';
import useGamepadChangeDirection from '@/hooks/useGamepadChangeDirection';
import useGameAnimation from '@/hooks/useGameAnimation';
import GameInformation from '@/components/GameInformation';
import GameSettings from '@/components/GameSettings';
import { getInitialGameState } from '@/game/helpers';
import useLocalStorageSaving from '@/hooks/useLocalStorageSaving';
import cssCommon from '@/styles/common.css';
import useLeaderboardScore from '@/hooks/useLeaderboardScore';
import withClientOnlyRender from '@/hocs/withClientOnly';

import css from './index.css';

const {
  changeGameStatus,
  restartGame,
} = gameActions;

const getScoreLabel = (scores: number[], label: string): JSX.Element => {
  if (scores.length === 1) {
    return (
      <div>
        {`${label}: ${scores[0]}`}
      </div>
    );
  }
  return (
    <>
      {scores.map((sc, index) => (
        <div key={`${index + 1}`}>
          {`${label} (${index + 1}-й игрок): ${sc}`}
        </div>
      ))}
    </>
  );
};

const Game = () => {
  const [state, dispatch] = useReducer<Reducer<IGameState, IGameReducerAction>>(
    gameReducer,
    getInitialGameState(),
  );

  const {
    bigFood,
    changingLevel,
    food,
    level,
    map,
    multiplayer,
    score,
    snake,
    status,
    timeToRemoveBigFood,
  } = state;

  useLocalStorageSaving(state);

  useKeyboardChangeDirection({
    dispatch,
    keyDown: 's',
    keyLeft: 'a',
    keyRight: 'd',
    keyUp: 'w',
    number: 0,
    status,
    trueCondition: status === GameStatus.RUNNING,
  });

  useKeyboardChangeDirection({
    dispatch,
    keyDown: 'ArrowDown',
    keyLeft: 'ArrowLeft',
    keyRight: 'ArrowRight',
    keyUp: 'ArrowUp',
    number: 1,
    status,
    trueCondition: status === GameStatus.RUNNING && multiplayer,
  });

  useGamepadChangeDirection({
    dispatch,
    number: 0,
    status,
    trueCondition: status === GameStatus.RUNNING,
  });

  useGameAnimation({
    dispatch,
    level,
    status,
  });

  useLeaderboardScore({ score, status, level });

  const startGameHandler = () => dispatch(changeGameStatus(GameStatus.RUNNING));

  const restartGameHandler = () => dispatch(restartGame());

  const gameModalProps: {
    [key in keyof Omit<typeof GameStatus, 'RUNNING'>]: IGameModal;
  } = {
    [GameStatus.WAITING_FOR_START]: {
      buttons: [{
        label: 'Начать',
        onClick: startGameHandler,
      }],
      children: (
        <GameSettings
          changingLevel={changingLevel}
          dispatch={dispatch}
          level={level}
          map={map}
          multiplayer={multiplayer}
        />
      ),
      title: 'Начать игру?',
    },
    [GameStatus.ON_PAUSE]: {
      buttons: [{
        label: 'Продолжить',
        onClick: startGameHandler,
      }, {
        label: 'Начать заново',
        onClick: restartGameHandler,
      }],
      children: (
        <>
          <div>{`Уровень: ${level}`}</div>
          {getScoreLabel(score, 'Очки')}
        </>
      ),
      title: 'Пауза',
    },
    [GameStatus.IS_OVER]: {
      buttons: [{
        label: 'Играть заново',
        onClick: restartGameHandler,
      }],
      children: getScoreLabel(score, 'Набрано очков'),
      title: 'Игра окончена',
    },
    [GameStatus.PASSED]: {
      buttons: [{
        label: 'Играть заново',
        onClick: restartGameHandler,
      }],
      children: getScoreLabel(score, 'Набрано очков'),
      title: 'Игра пройдена',
    },
  };

  return (
    <div className={css.gameContainer}>
      <h1 className={cssCommon.visuallyHidden}>Игра</h1>
      <GameInformation
        level={level}
        score={score}
        timeToRemoveBigFood={timeToRemoveBigFood}
      />
      <Canvas
        bigFood={bigFood}
        food={food}
        map={map}
        snakes={snake}
      />
      {status !== GameStatus.RUNNING && (
        <GameModal
          buttons={gameModalProps[status].buttons}
          title={gameModalProps[status].title}
        >
          {gameModalProps[status].children}
        </GameModal>
      )}
    </div>
  );
};

export default withClientOnlyRender(Game);
