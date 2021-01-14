import {
  lazy,
  LazyExoticComponent,
} from 'react';

export interface IRoute {
  view: LazyExoticComponent<any>;
  exact?: boolean;
  path?: string,
}

const routes: IRoute[] = [{
  exact: true,
  path: '/',
  view: lazy(() => import('./pages/Game')),
}, {
  path: '/profile/edit',
  view: lazy(() => import('./pages/ProfileSettings')),
}, {
  path: '/profile',
  view: lazy(() => import('./pages/Profile')),
}, {
  path: '/leaderboard',
  view: lazy(() => import('./pages/Leaderboard')),
}, {
  path: '/forum',
  view: lazy(() => import('./pages/Forum')),
}, {
  path: '/feedback',
  view: lazy(() => import('./pages/Feedback')),
}, {
  // этот роут должен быть последним, тк будет отображаться, если предыдущие роуты не подойдут
  view: lazy(() => import('./pages/Error404')),
}];

export default routes;
