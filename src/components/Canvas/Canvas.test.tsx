import { render } from '@testing-library/react';
import {
  Direction,
  IFood,
  ISnakePart,
} from '@/lib/Painter/interfaces';
import Painter from '@/lib/Painter';
import maps from '@/game/maps';
import Canvas from '.';

describe('Canvas', () => {
  const food: IFood = { x: 1, y: 1 };
  const snakes: ISnakePart[][] = [[{
    x: 2, y: 2, direction: Direction.Right,
  }, {
    x: 3, y: 2, direction: Direction.Right,
  }, {
    x: 4, y: 2, direction: Direction.Right,
  }]];

  it('renders snake correctly', () => {
    const spyRenderSnake = jest.spyOn(Painter, 'renderSnake');

    render(
      <Canvas
        bigFood={null}
        food={food}
        map={0}
        snakes={snakes}
      />,
    );

    expect(spyRenderSnake).toBeCalledWith(snakes[0]);

    spyRenderSnake.mockRestore();
  });

  it('renders map correctly', () => {
    const spyRenderMap = jest.spyOn(Painter, 'renderMap');

    render(
      <Canvas
        bigFood={null}
        food={food}
        map={0}
        snakes={snakes}
      />,
    );

    expect(spyRenderMap).toBeCalledWith(maps[0]);

    spyRenderMap.mockRestore();
  });

  describe('renders food', () => {
    const spyRenderBigFood = jest.spyOn(Painter, 'renderBigFood');
    const spyRenderFood = jest.spyOn(Painter, 'renderFood');

    beforeEach(() => {
      spyRenderBigFood.mockReset();
      spyRenderFood.mockReset();
    });

    it('small one if "bigFood" parameter does not passed', () => {
      render(
        <Canvas
          bigFood={null}
          food={food}
          map={0}
          snakes={snakes}
        />,
      );

      expect(spyRenderFood).toBeCalledWith(food);
      expect(spyRenderBigFood).not.toBeCalled();
    });

    it('small and big if "bigFood" parameter passed', () => {
      const bigFood: IFood = { x: 3, y: 3 };

      render(
        <Canvas
          bigFood={bigFood}
          food={food}
          map={0}
          snakes={snakes}
        />,
      );

      expect(spyRenderFood).toBeCalledWith(food);
      expect(spyRenderBigFood).toBeCalledWith(bigFood);
    });
  });
});
