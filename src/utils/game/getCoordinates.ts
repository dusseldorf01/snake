import gameConfig from '@/game/config';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
} = gameConfig;

export const getNextXCoordinate = (x: number) => (
  x < BOARD_WIDTH_ITEMS_COUNT - 1 ? x + 1 : 0
);

export const getPrevXCoordinate = (x: number) => (
  x > 0 ? x - 1 : BOARD_WIDTH_ITEMS_COUNT - 1
);

export const getNextYCoordinate = (y: number) => (
  y < BOARD_HEIGHT_ITEMS_COUNT - 1 ? y + 1 : 0
);

export const getPrevYCoordinate = (y: number) => (
  y > 0 ? y - 1 : BOARD_HEIGHT_ITEMS_COUNT - 1
);
