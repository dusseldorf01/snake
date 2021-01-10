import {
  Reducer,
  useReducer,
} from 'react';
import Canvas from '@/components/Canvas';
import {
  gameReducer,
  GameReducerType,
  GameStatus,
  IGameReducerAction,
  IGameState,
  initialGameState,
} from '@/pages/Game/reducer';
import GameModal from '@/components/GameModal';
import { IGameModal } from '@/components/GameModal/interfaces';
import useKeyboardChangeDirection from '@/hooks/useKeyboardChangeDirection';
import useGameAnimation from '@/hooks/useGameAnimation';
import './index.css';

const Game = () => {
  const [{
    bigFood,
    food,
    level,
    score,
    snake,
    status,
    timeToRemoveBigFood,
  }, dispatch] = useReducer<Reducer<IGameState, IGameReducerAction>>(
    gameReducer,
    initialGameState,
  );

  useKeyboardChangeDirection({
    dispatch,
    keyDown: 's',
    keyLeft: 'a',
    keyRight: 'd',
    keyUp: 'w',
    status,
  });

  useGameAnimation({
    dispatch,
    level,
    status,
  });

  const startGame = () => dispatch({
    type: GameReducerType.CHANGE_GAME_STATUS,
    payload: GameStatus.RUNNING,
  });

  const restartGame = () => dispatch({
    type: GameReducerType.RESTART_GAME,
  });

  const gameModalProps: {
    [key in keyof Omit<typeof GameStatus, 'RUNNING'>]: IGameModal;
  } = {
    [GameStatus.WAITING_FOR_START]: {
      buttonLabel: 'Начать',
      onClick: startGame,
      title: 'Начать игру?',
    },
    [GameStatus.ON_PAUSE]: {
      buttonLabel: 'Продолжить',
      children: (
        <>
          <div>{`Уровень: ${level}`}</div>
          <div>{`Очки: ${score}`}</div>
        </>
      ),
      onClick: startGame,
      title: 'Пауза',
    },
    [GameStatus.IS_OVER]: {
      buttonLabel: 'Играть заново',
      children: <div>{`Набрано очков: ${score}`}</div>,
      onClick: restartGame,
      title: 'Игра окончена',
    },
    [GameStatus.PASSED]: {
      buttonLabel: 'Играть заново',
      children: <div>{`Набрано очков: ${score}`}</div>,
      onClick: restartGame,
      title: 'Игра пройдена',
    },
  };

  return (
    <div className="game-container">
      <h1 className="visually-hidden">Игра</h1>
      <div className="game-information">
        <div className="game-information__item">{`Уровень: ${level}`}</div>
        <div className="game-information__item">{`Очки: ${score}`}</div>
        {timeToRemoveBigFood > 0 && (
          <div className="game-information__item">{`Бонусная еда: ${Math.round(timeToRemoveBigFood / level)}`}</div>
        )}
      </div>
      <Canvas
        bigFood={bigFood}
        food={food}
        snake={snake}
      />
      {status !== GameStatus.RUNNING && (
        <GameModal
          buttonLabel={gameModalProps[status].buttonLabel}
          onClick={gameModalProps[status].onClick}
          title={gameModalProps[status].title}
        >
          {gameModalProps[status].children}
        </GameModal>
      )}
    </div>
  );
};

export default Game;
