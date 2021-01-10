export enum Direction {
  TOP = 'TO_TOP',
  RIGHT = 'TO_RIGHT',
  BOTTOM = 'TO_BOTTOM',
  LEFT = 'TO_LEFT',
}

export interface ISnakeCoordinate {
  x: number;
  y: number;
  direction: Direction;
}

export interface ISnakePart extends ISnakeCoordinate {
  eaten?: boolean;
  readyToEat?: boolean;
}

export interface ICanvasSnakePart extends ISnakePart {
  changeDirection?: boolean;
}

export interface IFood {
  x: number;
  y: number;
}
