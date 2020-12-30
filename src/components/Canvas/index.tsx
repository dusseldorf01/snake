import {
  FunctionComponent,
  useEffect,
  useRef,
} from 'react';
import gameParams from '@/gameParams';
import Painter from '@/lib/Painter';
import { ICanvas } from './interfaces';
import './index.css';

const {
  boardHeight,
  boardWidth,
} = gameParams;

const Canvas: FunctionComponent<ICanvas> = ({
  bigFood,
  food,
  snake,
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

    context.clearRect(0, 0, boardWidth, boardHeight);

    const html = document.querySelector('html');
    context.fillStyle = html?.classList.contains('light') ? '#1E1E1E' : '#FFFFFF';

    Painter.setContext(context);

    Painter.renderSnake(snake);

    Painter.renderFood(food);

    if (bigFood !== null) {
      Painter.renderBigFood(bigFood);
    }
  });

  return (
    <canvas
      id="canvas"
      className="game-canvas"
      ref={canvas}
      width={boardWidth}
      height={boardHeight}
    />
  );
};

export default Canvas;
