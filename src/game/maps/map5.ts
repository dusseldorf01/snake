import gameConfig from '../config';
import { WallType } from './interfaces';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
} = gameConfig;

const map: WallType[] = [];

const door = Math.floor(BOARD_HEIGHT_ITEMS_COUNT / 9);

const maxX = BOARD_WIDTH_ITEMS_COUNT - 1;
const maxY = BOARD_HEIGHT_ITEMS_COUNT - 1;
const centerY = Math.ceil((BOARD_HEIGHT_ITEMS_COUNT - 1) / 2);
const centerX = Math.ceil((BOARD_WIDTH_ITEMS_COUNT - 1) / 2);
const topHorWallY = Math.ceil((BOARD_HEIGHT_ITEMS_COUNT - 1) / 3);
const leftVertWallX = Math.ceil((BOARD_WIDTH_ITEMS_COUNT - 1) / 3);

const isTopDoor = (i: number) => i >= door && i <= 2 * door;
const isCenterVertDoor = (i: number) => i >= centerY - door / 2 && i <= centerY + door / 2;
const isBottomDoor = (i: number) => i >= maxY - 2 * door && i <= maxY - door;
const isCenterHorDoor = (i: number) => i >= centerX - door / 2 && i <= centerX + door / 2;
const isLeftDoor = (i: number) => i >= 3 * door && i <= 4 * door;
const isRightDoor = (i: number) => i >= 16 * door && i <= 17 * door;

for (let i = 0; i < BOARD_HEIGHT_ITEMS_COUNT; i += 1) {
  if (!(isTopDoor(i) || isBottomDoor(i) || isCenterVertDoor(i))) {
    map.push({ x: 0, y: i });
  }
}

for (let i = 1; i < BOARD_HEIGHT_ITEMS_COUNT; i += 1) {
  if (!(isTopDoor(i) || isBottomDoor(i) || isCenterVertDoor(i))) {
    map.push({ x: BOARD_WIDTH_ITEMS_COUNT - 1, y: i });
  }
}

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT; i += 1) {
  if (!isCenterHorDoor(i)) {
    map.push({ x: i, y: 0 });
  }
}

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT; i += 1) {
  if (!isCenterHorDoor(i)) {
    map.push({ x: i, y: maxY });
  }
}

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT; i += 1) {
  if (!(isLeftDoor(i) || isRightDoor(i))) {
    map.push({ x: i, y: topHorWallY });
  }
}

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT; i += 1) {
  if (!(isLeftDoor(i) || isRightDoor(i))) {
    map.push({ x: i, y: maxY - topHorWallY });
  }
}

for (let i = 1; i < topHorWallY; i += 1) {
  if (!isTopDoor(i)) {
    map.push({ x: maxX - leftVertWallX, y: i });
  }
}

for (let i = topHorWallY + 1; i < maxY - topHorWallY; i += 1) {
  if (!isCenterVertDoor(i)) {
    map.push({ x: centerX, y: i });
  }
}

for (let i = BOARD_HEIGHT_ITEMS_COUNT - topHorWallY; i < maxY; i += 1) {
  if (!isBottomDoor(i)) {
    map.push({ x: leftVertWallX, y: i });
  }
}

export default map;
