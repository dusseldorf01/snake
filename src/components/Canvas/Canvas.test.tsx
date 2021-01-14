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
    x: 2, y: 2, direction: Direction.RIGHT,
  }, {
    x: 3, y: 2, direction: Direction.RIGHT,
  }, {
    x: 4, y: 2, direction: Direction.RIGHT,
  }]];

  it('checking snake rendering', () => {
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

  it('checking food rendering', () => {
    const spyRenderFood = jest.spyOn(Painter, 'renderFood');

    render(
      <Canvas
        bigFood={null}
        food={food}
        map={0}
        snakes={snakes}
      />,
    );

    expect(spyRenderFood).toBeCalledWith(food);

    spyRenderFood.mockRestore();
  });

  describe('checking big food rendering', () => {
    let spyRenderBigFood: jest.SpyInstance<void, [IFood]>;

    beforeAll(() => {
      spyRenderBigFood = jest.spyOn(Painter, 'renderBigFood');
    });

    afterEach(() => {
      spyRenderBigFood.mockReset();
    });

    afterAll(() => {
      spyRenderBigFood.mockRestore();
    });

    it('checking that there was no big food rendering', () => {
      render(
        <Canvas
          bigFood={null}
          food={food}
          map={0}
          snakes={snakes}
        />,
      );

      expect(spyRenderBigFood).not.toBeCalled();
    });

    it('checking big food rendering', () => {
      const bigFood: IFood = { x: 3, y: 3 };

      render(
        <Canvas
          bigFood={bigFood}
          food={food}
          map={0}
          snakes={snakes}
        />,
      );

      expect(spyRenderBigFood).toBeCalledWith(bigFood);
    });
  });

  it('checking map rendering', () => {
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
});
