import type {
  ISnakeCoordinate,
  IWall,
} from '@/lib/Painter/interfaces';

const isBumpIntoWall = ({
  x,
  y,
}: ISnakeCoordinate, walls: IWall[]) => (
  !!walls.find((w) => w.x === x && w.y === y)
);

export default isBumpIntoWall;
