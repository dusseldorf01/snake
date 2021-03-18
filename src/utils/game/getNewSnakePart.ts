import {
  Direction,
  ISnakeCoordinate,
  ISnakePart,
} from '@/lib/Painter/interfaces';
import {
  getNextXCoordinate,
  getNextYCoordinate,
  getPrevXCoordinate,
  getPrevYCoordinate,
} from '@/utils/game/getCoordinates';

const getNewSnakePart = (
  direction: Direction, {
    x,
    y,
  }: ISnakePart,
): ISnakeCoordinate => {
  switch (direction) {
    case Direction.TOP:
      return { x, y: getPrevYCoordinate(y), direction };
    case Direction.BOTTOM:
      return { x, y: getNextYCoordinate(y), direction };
    case Direction.LEFT:
      return { x: getPrevXCoordinate(x), y, direction };
    case Direction.RIGHT:
      return { x: getNextXCoordinate(x), y, direction };
    default:
      throw new Error('Unknown direction');
  }
};

export default getNewSnakePart;
