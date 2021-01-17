import gameConfig from '../config';
import type { WallType } from './interfaces';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
} = gameConfig;

const map: WallType[] = [];

const horLineWidth = Math.floor(BOARD_WIDTH_ITEMS_COUNT / 4);
const vertLineWidth = Math.floor(BOARD_HEIGHT_ITEMS_COUNT / 4);
const centerY = Math.ceil((BOARD_HEIGHT_ITEMS_COUNT - 1) / 2);
const centerX = Math.ceil((BOARD_WIDTH_ITEMS_COUNT - 1) / 2);

for (let i = 0; i < horLineWidth; i += 1) {
  map.push({ x: i, y: centerY });
  map.push({ x: BOARD_WIDTH_ITEMS_COUNT - 1 - i, y: centerY });
}

for (let i = 0; i < vertLineWidth; i += 1) {
  map.push({ x: centerX, y: i });
  map.push({ x: centerX, y: BOARD_HEIGHT_ITEMS_COUNT - 1 - i });
}

const sectionX = Math.ceil((2 * horLineWidth) / 6);
const isLeftSide = (i: number) => i <= horLineWidth + sectionX;
const isRightSide = (i: number) => i >= BOARD_WIDTH_ITEMS_COUNT - horLineWidth - 1 - sectionX;
const isCenterHorSide = (i: number) => i >= centerX - sectionX / 2 && i <= centerX + sectionX / 2;

for (let i = horLineWidth; i < BOARD_WIDTH_ITEMS_COUNT - horLineWidth; i += 1) {
  if (isLeftSide(i) || isRightSide(i) || isCenterHorSide(i)) {
    map.push({ x: i, y: vertLineWidth });
  }
}

for (let i = horLineWidth; i < BOARD_WIDTH_ITEMS_COUNT - horLineWidth; i += 1) {
  if (isLeftSide(i) || isRightSide(i) || isCenterHorSide(i)) {
    map.push({ x: i, y: BOARD_HEIGHT_ITEMS_COUNT - vertLineWidth - 1 });
  }
}

const sectionY = Math.ceil((2 * vertLineWidth) / 6);
const isTopSide = (i: number) => i <= vertLineWidth + sectionY;
const isBottomSide = (i: number) => i >= BOARD_HEIGHT_ITEMS_COUNT - vertLineWidth - 1 - sectionY;
const isCenterVertSide = (i: number) => i >= centerY - sectionY / 2 && i <= centerY + sectionY / 2;

for (let i = vertLineWidth; i < BOARD_HEIGHT_ITEMS_COUNT - vertLineWidth; i += 1) {
  if (isTopSide(i) || isBottomSide(i) || isCenterVertSide(i)) {
    map.push({ x: horLineWidth, y: i });
  }
}

for (let i = vertLineWidth; i < BOARD_HEIGHT_ITEMS_COUNT - vertLineWidth; i += 1) {
  if (isTopSide(i) || isBottomSide(i) || isCenterVertSide(i)) {
    map.push({ x: BOARD_WIDTH_ITEMS_COUNT - horLineWidth - 1, y: i });
  }
}

export default map;
