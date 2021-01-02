import {
  lazy,
} from 'react';
import { Switch } from 'react-router';
import PrivateRoute from '@/components/Route/PrivateRoute';
import { Route } from 'react-router-dom';
import GuestRoute from '@/components/Route/GuestRoute';

const Routes = () => (
  <Switch>
    <PrivateRoute path="/profile" component={lazy(() => import('./pages/Profile'))} />
    <PrivateRoute path="/leaderboard" component={lazy(() => import('./pages/Leaderboard'))} />
    <PrivateRoute path="/forum" component={lazy(() => import('./pages/Forum'))} />
    <PrivateRoute path="/feedback" component={lazy(() => import('./pages/Feedback'))} />
    <GuestRoute path="/register" component={lazy(() => import('./pages/Registration'))} />
    <GuestRoute path="/login" component={lazy(() => import('./pages/Login'))} />
    <PrivateRoute path="/" component={lazy(() => import('./pages/Game'))} />
    <Route path="*" component={lazy(() => import('./pages/Error404'))} />
  </Switch>
);

export default Routes;
