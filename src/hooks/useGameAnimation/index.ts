import {
  useEffect,
  useRef,
} from 'react';
import type { IUseGameAnimation } from '@/hooks/useGameAnimation/interfaces';
import { GameStatus } from '@/game/interfaces';
import gameActions from '@/game/actionCreators';

const { getNextTick } = gameActions;

export default ({
  dispatch,
  level,
  status,
}: IUseGameAnimation) => {
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (status !== GameStatus.RUNNING) {
      return;
    }

    let start = performance.now();

    const animation = () => {
      const current = performance.now();

      if (current - start >= 1000 / level) {
        dispatch(getNextTick());
        start = current;
      }

      animationRef.current = requestAnimationFrame(animation);
    };

    animation();

    // eslint-disable-next-line consistent-return
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [status, level]);
};
