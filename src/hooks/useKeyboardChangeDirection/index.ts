import { useEffect } from 'react';
import { IUseKeyboardChangeDirection } from '@/hooks/useKeyboardChangeDirection/interfaces';
import {
  GameReducerType,
  GameStatus,
} from '@/pages/Game/reducer';
import { Direction } from '@/lib/Painter/interfaces';

export default ({
  dispatch,
  keyDown,
  keyLeft,
  keyRight,
  keyUp,
  status,
}: IUseKeyboardChangeDirection) => {
  useEffect(() => {
    if (status !== GameStatus.RUNNING) {
      return;
    }

    const listener = ({ key }: KeyboardEvent) => {
      switch (key) {
        case keyUp: {
          dispatch({
            payload: Direction.TOP,
            type: GameReducerType.CHANGE_DIRECTION,
          });
          break;
        }
        case keyDown: {
          dispatch({
            payload: Direction.BOTTOM,
            type: GameReducerType.CHANGE_DIRECTION,
          });
          break;
        }
        case keyRight: {
          dispatch({
            payload: Direction.RIGHT,
            type: GameReducerType.CHANGE_DIRECTION,
          });
          break;
        }
        case keyLeft: {
          dispatch({
            payload: Direction.LEFT,
            type: GameReducerType.CHANGE_DIRECTION,
          });
          break;
        }
        case ' ': {
          dispatch({
            type: GameReducerType.CHANGE_GAME_STATUS,
            payload: GameStatus.ON_PAUSE,
          });
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener('keyup', listener);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('keyup', listener);
    };
  }, [status]);
};
