import type {
  ISnakeCoordinate,
  ISnakePart,
} from '@/lib/Painter/interfaces';

const isDead = (head: ISnakeCoordinate, snake: ISnakePart[]): boolean => (
  !!snake.slice(0, -1).find(({ x, y }) => head.x === x && head.y === y)
);

export default isDead;
