import Themes from '@/server/controllers/Themes';
import type { IRoute } from '@/utils/api/getRoutes';

const themeRoutes: IRoute[] = [{
  handler: Themes.getAll,
  method: 'get',
  path: '/themes',
}, {
  handler: Themes.getById,
  method: 'get',
  path: '/themes/:themeId',
}, {
  handler: Themes.create,
  method: 'post',
  path: '/themes',
}, {
  handler: Themes.update,
  method: 'patch',
  path: '/themes/:themeId',
}, {
  handler: Themes.delete,
  method: 'delete',
  path: '/themes/:themeId',
}];

export default themeRoutes;
