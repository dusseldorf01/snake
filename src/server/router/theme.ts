import {
  create as createTheme,
  getAll as getAllThemes,
  getById as getThemeById,
  remove as removeTheme,
  update as updateTheme,
} from '@/server/controllers/Themes';
import type { IRoute } from '@/utils/api/getRoutes';

const themeRoutes: IRoute[] = [{
  handler: getAllThemes,
  method: 'get',
  path: '/themes',
}, {
  handler: getThemeById,
  method: 'get',
  path: '/themes/:themeId',
}, {
  handler: createTheme,
  method: 'post',
  path: '/themes',
}, {
  handler: updateTheme,
  method: 'patch',
  path: '/themes/:themeId',
}, {
  handler: removeTheme,
  method: 'delete',
  path: '/themes/:themeId',
}];

export default themeRoutes;
