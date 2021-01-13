import {
  memo,
  useEffect,
  useRef,
} from 'react';
import gameConfig from '@/game/config';
import Painter from '@/lib/Painter';
import colors from '@/styles/colors';
import maps from '@/game/maps';
import { ICanvas } from './interfaces';
import './index.css';

const {
  BOARD_HEIGHT,
  BOARD_WIDTH,
} = gameConfig;

const {
  BLACK_1,
  WHITE_1,
} = colors;

const Canvas = ({
  bigFood,
  food,
  map: mapIndex,
  snakes,
}: ICanvas) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current === null) {
      return;
    }

    const context = canvas.current.getContext('2d');

    if (context === null) {
      return;
    }

    context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    const html = document.querySelector('html');
    context.fillStyle = html?.classList.contains('light') ? BLACK_1 : WHITE_1;

    Painter.setContext(context);

    snakes.forEach((snake) => {
      Painter.renderSnake(snake);
    });

    Painter.renderFood(food);

    Painter.renderMap(maps[mapIndex]);

    if (bigFood !== null) {
      Painter.renderBigFood(bigFood);
    }
  });

  return (
    <canvas
      id="canvas"
      className="game-canvas"
      ref={canvas}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
    />
  );
};

export default memo(Canvas);
