import type {
  IFood,
  ISnakePart,
  IWall,
} from '@/lib/Painter/interfaces';
import gameConfig from '@/game/config';
import createFood from '@/utils/game/createFood';

const { TICKS_TO_REMOVE_BIG_FOOD } = gameConfig;

const createBigFood = (
  snake: ISnakePart[],
  existingFood: IFood | null,
  walls: IWall[],
): {
  bigFood: IFood | null;
  timeToRemoveBigFood: number;
} => ({
  bigFood: createFood(snake, existingFood, walls),
  timeToRemoveBigFood: TICKS_TO_REMOVE_BIG_FOOD,
});

export default createBigFood;
