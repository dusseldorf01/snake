import {
  getByUserId as getThemeByUserId,
  update as updateTheme,
} from '@/server/controllers/UserThemes';
import type { IRoute } from '@/utils/api/getRoutes';

const userThemeRoutes: IRoute[] = [{
  handler: getThemeByUserId,
  method: 'get',
  path: '/user-theme',
}, {
  handler: updateTheme,
  method: 'patch',
  path: '/user-theme',
}];

export default userThemeRoutes;
