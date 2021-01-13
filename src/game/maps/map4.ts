import gameConfig from '../config';
import { WallType } from './interfaces';

const {
  BOARD_HEIGHT_ITEMS_COUNT,
  BOARD_WIDTH_ITEMS_COUNT,
} = gameConfig;

const map: WallType[] = [];

const door = Math.floor(BOARD_HEIGHT_ITEMS_COUNT / 6);

const isTopDoor = (i: number) => i >= door && i <= 2 * door;
const isBottomDoor = (i: number) => i >= 4 * door && i <= 5 * door;
const isLeftDoor = (i: number) => i >= door && i <= 2 * door;
const maxX = BOARD_WIDTH_ITEMS_COUNT - 1;
const isRightDoor = (i: number) => i >= maxX - 2 * door && i <= maxX - door;

for (let i = 0; i < BOARD_HEIGHT_ITEMS_COUNT; i += 1) {
  if (!(isTopDoor(i) || isBottomDoor(i))) {
    map.push({ x: 0, y: i });
  }
}

for (let i = 1; i < BOARD_HEIGHT_ITEMS_COUNT; i += 1) {
  if (!(isTopDoor(i) || isBottomDoor(i))) {
    map.push({ x: BOARD_WIDTH_ITEMS_COUNT - 1, y: i });
  }
}

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT; i += 1) {
  if (!(isLeftDoor(i) || isRightDoor(i))) {
    map.push({ x: i, y: 0 });
  }
}

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT - 1; i += 1) {
  if (!(isLeftDoor(i) || isRightDoor(i))) {
    map.push({ x: i, y: BOARD_HEIGHT_ITEMS_COUNT - 1 });
  }
}

const centerY = Math.ceil((BOARD_HEIGHT_ITEMS_COUNT - 1) / 2);
const centerX = Math.ceil((BOARD_WIDTH_ITEMS_COUNT - 1) / 2);

for (let i = 1; i < BOARD_WIDTH_ITEMS_COUNT - 1; i += 1) {
  if (!(i >= centerX - door / 2 && i <= centerX + door / 2)) {
    map.push({ x: i, y: centerY });
  }
}

const internalLeftWallX = 3 * door;

for (let i = centerY + 1; i <= BOARD_HEIGHT_ITEMS_COUNT - 2; i += 1) {
  if (!(isBottomDoor(i))) {
    map.push({ x: internalLeftWallX, y: i });
  }
}

const internalRightWallX = 9 * door;

for (let i = 1; i <= centerY - 1; i += 1) {
  if (!(isTopDoor(i))) {
    map.push({ x: internalRightWallX, y: i });
  }
}

export default map;
