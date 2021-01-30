import { useEffect } from 'react';
import type { IUseKeyboardChangeDirection } from '@/hooks/useKeyboardChangeDirection/interfaces';
import { GameStatus } from '@/game/interfaces';
import gameActions from '@/game/actionCreators';

const {
  changeGameStatus,
  goToBottom,
  goToLeft,
  goToRight,
  goToTop,
} = gameActions;

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
        case ' ': {
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
