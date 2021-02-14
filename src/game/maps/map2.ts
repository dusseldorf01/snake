import gameConfig from '../config';
import type { WallType } from './interfaces';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
} = gameConfig;

const map: WallType[] = [];

for (let i = 0; i < BOARD_HEIGHT_ITEMS_COUNT; i += 1) {
  map.push({ x: 0, y: i });
}

for (let i = 1; i < BOARD_HEIGHT_ITEMS_COUNT; i += 1) {
  map.push({ x: BOARD_WIDTH_ITEMS_COUNT - 1, y: i });
}

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT; i += 1) {
  map.push({ x: i, y: 0 });
}

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT - 1; i += 1) {
  map.push({ x: i, y: BOARD_HEIGHT_ITEMS_COUNT - 1 });
}

export default map;
