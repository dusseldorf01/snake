import {
  memo,
  useEffect,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import userThemeSelector from '@/selectors/userTheme';
import { Theme } from '@/models/theme';
import gameConfig from '@/game/config';
import Painter from '@/lib/Painter';
import colors from '@/styles/colors';
import type { ICanvas } from './interfaces';
import css from './index.css';

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
  map,
  snakes,
}: ICanvas) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const { themeName } = useSelector(userThemeSelector);

  useEffect(() => {
    if (canvas.current === null) {
      return;
    }

    const context = canvas.current.getContext('2d');

    if (context === null) {
      return;
    }

    context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    context.fillStyle = themeName === Theme.LIGHT ? BLACK_1 : WHITE_1;

    Painter.setContext(context);
    Painter.gameInitializationRender({
      snakes, food, map, bigFood,
    });
  });

  return (
    <canvas
      id="canvas"
      className={css.gameCanvas}
      ref={canvas}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
    />
  );
};

export default memo(Canvas);
