import UserThemes from '@/server/controllers/UserThemes';
import type { IRoute } from '@/utils/api/getRoutes';

const userThemeRoutes: IRoute[] = [{
  handler: UserThemes.get,
  method: 'get',
  path: '/user-theme',
}, {
  handler: UserThemes.update,
  method: 'patch',
  path: '/user-theme',
}];

export default userThemeRoutes;
