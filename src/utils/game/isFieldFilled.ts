import gameConfig from '@/game/config';
import type {
  ISnakePart,
  IWall,
} from '@/lib/Painter/interfaces';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
} = gameConfig;

const isFieldFilled = (snakes: ISnakePart[], map: IWall[]) => (
  snakes.length + map.length === BOARD_WIDTH_ITEMS_COUNT * BOARD_HEIGHT_ITEMS_COUNT
);

export default isFieldFilled;
