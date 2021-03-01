export enum Direction {
  Top = 'TO_TOP',
  Right = 'TO_RIGHT',
  Bottom = 'TO_BOTTOM',
  Left = 'TO_LEFT',
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
