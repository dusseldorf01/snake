import type {
  IFood,
  ISnakePart,
} from '@/lib/Painter/interfaces';
import {
  getNextXCoordinate,
  getNextYCoordinate,
  getPrevXCoordinate,
  getPrevYCoordinate,
} from '@/utils/game/getCoordinates';

const checkReadyToEat = (
  head: ISnakePart,
  food: IFood,
  bigFood: null | IFood,
): ISnakePart => {
  const { x, y } = head;
  const isFoodNearOnX = (x === getNextXCoordinate(food.x) || x === getPrevXCoordinate(food.x))
    && y === food.y;
  const isFoodNearOnY = (y === getNextYCoordinate(food.y) || y === getPrevYCoordinate(food.y))
    && x === food.x;
  const isBigFoodNearOnX = bigFood && y === bigFood.y && (
    x === getNextXCoordinate(bigFood.x) || x === getPrevXCoordinate(bigFood.x)
  );
  const isBigFoodNearOnY = bigFood && x === bigFood.x && (
    y === getNextYCoordinate(bigFood.y) || y === getPrevYCoordinate(bigFood.y)
  );
  if (isFoodNearOnX || isFoodNearOnY || isBigFoodNearOnX || isBigFoodNearOnY) {
    return {
      ...head,
      readyToEat: true,
    };
  }
  return head;
};

export default checkReadyToEat;
