import {
  IFood,
  ISnakePart,
} from '@/lib/Painter/interfaces';

export interface ICanvas {
  bigFood: null | IFood;
  food: IFood;
  snake: ISnakePart[];
}