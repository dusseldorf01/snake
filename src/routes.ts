import {
  lazy,
  LazyExoticComponent,
} from 'react';

export type RouteType = 'private' | 'guest';

export interface IRoute {
  view: LazyExoticComponent<any>;
  exact?: boolean;
  path?: string,
  type?: RouteType
}

const routes: IRoute[] = [{
  exact: true,
  path: '/',
  view: lazy(() => import('./pages/Game')),
  type: 'private',
}, {
  path: '/profile',
  view: lazy(() => import('./pages/Profile')),
  type: 'private',
}, {
  path: '/leaderboard',
  view: lazy(() => import('./pages/Leaderboard')),
  type: 'private',
}, {
  path: '/forum',
  view: lazy(() => import('./pages/Forum')),
  type: 'private',
}, {
  path: '/feedback',
  view: lazy(() => import('./pages/Feedback')),
  type: 'private',
}, {
  path: '/register',
  view: lazy(() => import('./pages/Registration')),
  type: 'guest',
}, {
  // этот роут должен быть последним, тк будет отображаться, если предыдущие роуты не подойдут
  view: lazy(() => import('./pages/Error404')),
}];

export default routes;
