import type { IFood } from '@/lib/Painter/interfaces';

const checkBigFood = (
  bigFood: IFood | null,
  timeToRemoveBigFood: number,
): {
  bigFood: IFood | null;
  timeToRemoveBigFood: number;
} => {
  if (timeToRemoveBigFood > 0) {
    return {
      timeToRemoveBigFood: timeToRemoveBigFood - 1,
      bigFood,
    };
  }
  return {
    timeToRemoveBigFood: 0,
    bigFood: null,
  };
};

export default checkBigFood;
