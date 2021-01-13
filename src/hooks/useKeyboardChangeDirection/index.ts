import { useEffect } from 'react';
import { IUseKeyboardChangeDirection } from '@/hooks/useKeyboardChangeDirection/interfaces';
import {
  GameReducerType,
  GameStatus,
} from '@/game/interfaces';
import { Direction } from '@/lib/Painter/interfaces';

export default ({
  dispatch,
  keyDown,
  keyLeft,
  keyRight,
  keyUp,
  number,
  status,
  trueCondition,
}: IUseKeyboardChangeDirection) => {
  useEffect(() => {
    if (!trueCondition) {
      return;
    }

    const listener = ({ key }: KeyboardEvent) => {
      switch (key) {
        case keyUp: {
          dispatch({
            payload: {
              dir: Direction.TOP,
              number,
            },
            type: GameReducerType.CHANGE_DIRECTION,
          });
          break;
        }
        case keyDown: {
          dispatch({
            payload: {
              dir: Direction.BOTTOM,
              number,
            },
            type: GameReducerType.CHANGE_DIRECTION,
          });
          break;
        }
        case keyRight: {
          dispatch({
            payload: {
              dir: Direction.RIGHT,
              number,
            },
            type: GameReducerType.CHANGE_DIRECTION,
          });
          break;
        }
        case keyLeft: {
          dispatch({
            payload: {
              dir: Direction.LEFT,
              number,
            },
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
