import type { IWall } from '@/lib/Painter/interfaces';
import parseMap from '@/utils/game/parseMap';
import map1 from './map1';
import map2 from './map2';
import map3 from './map3';
import map4 from './map4';
import map5 from './map5';

const maps: IWall[][] = [
  map1,
  map2,
  map3,
  map4,
  map5,
].map((map) => parseMap(map));

export default maps;
