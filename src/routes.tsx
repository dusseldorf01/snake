import {
  lazy,
} from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import PrivateRoute from '@/components/Route/PrivateRoute';
import GuestRoute from '@/components/Route/GuestRoute';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import GuestLayout from '@/components/Layout/GuestLayout';

const Routes = () => (
  <Switch>
    <Route path={['/login', '/register']}>
      <GuestLayout>
        <Switch>
          <GuestRoute path="/register" component={lazy(() => import('./pages/Registration'))} />
          <GuestRoute path="/login" component={lazy(() => import('./pages/Login'))} />
        </Switch>
      </GuestLayout>
    </Route>
    <Route>
      <DefaultLayout>
        <Switch>
          <PrivateRoute path="/profile/edit" component={lazy(() => import('./pages/ProfileSettings'))} />
          <PrivateRoute path="/profile" component={lazy(() => import('./pages/Profile'))} />
          <PrivateRoute path="/leaderboard" component={lazy(() => import('./pages/Leaderboard'))} />
          <PrivateRoute path="/forum" component={lazy(() => import('./pages/Forum'))} />
          <PrivateRoute path="/feedback" component={lazy(() => import('./pages/Feedback'))} />
          <PrivateRoute path="/" component={lazy(() => import('./pages/Game'))} />
          <Route path="*" component={lazy(() => import('./pages/Error404'))} />
        </Switch>
      </DefaultLayout>
    </Route>
  </Switch>
);

export default Routes;
