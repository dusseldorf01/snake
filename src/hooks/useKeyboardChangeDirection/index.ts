import { useEffect } from 'react';
import type { IUseKeyboardChangeDirection } from '@/hooks/useKeyboardChangeDirection/interfaces';
import { GameStatus } from '@/game/interfaces';
import {
  changeGameStatus,
  goToBottom,
  goToLeft,
  goToRight,
  goToTop,
} from '@/actions/game';

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

    const listener = ({ code }: KeyboardEvent) => {
      switch (code) {
        case keyUp: {
          dispatch(goToTop(number));
          break;
        }
        case keyDown: {
          dispatch(goToBottom(number));
          break;
        }
        case keyRight: {
          dispatch(goToRight(number));
          break;
        }
        case keyLeft: {
          dispatch(goToLeft(number));
          break;
        }
        case 'Space': {
          dispatch(changeGameStatus(GameStatus.ON_PAUSE));
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
