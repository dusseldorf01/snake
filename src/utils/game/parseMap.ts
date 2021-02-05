import type { IWall } from '@/lib/Painter/interfaces';

const parseMap = (str: string): IWall[] => {
  const map: IWall[] = [];

  const rows = str.split('\n').slice(1, -1);

  rows.forEach((row, y) => {
    const cells = row.split('');

    cells.forEach((cell, x) => {
      if (cell === '#') {
        map.push({ x, y });
      }
    });
  });

  return map;
};

export default parseMap;
