import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';
import PrivateRoute from '@/components/Route/PrivateRoute';
import GuestRoute from '@/components/Route/GuestRoute';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import GuestLayout from '@/components/Layout/GuestLayout';

const Leaderboard = loadable(() => import('./pages/Leaderboard'));

const Routes = () => (
  <Switch>
    <Route path={['/login', '/register']}>
      <GuestLayout>
        <Switch>
          <GuestRoute
            path="/register"
            component={loadable(() => import('./pages/Registration'))}
          />
          <GuestRoute path="/login" component={loadable(() => import('./pages/Login'))} />
        </Switch>
      </GuestLayout>
    </Route>
    <Route>
      <DefaultLayout>
        <Switch>
          <PrivateRoute path="/profile/edit" component={loadable(() => import('./pages/ProfileSettings'))} />
          <PrivateRoute path="/profile" component={loadable(() => import('./pages/Profile'))} />
          <PrivateRoute path="/leaderboard" component={Leaderboard} />
          <PrivateRoute path="/forum" component={loadable(() => import('./pages/Forum'))} exact />
          <PrivateRoute path="/forum/:id" component={loadable(() => import('./pages/Post'))} />
          <PrivateRoute path="/feedback" component={loadable(() => import('./pages/Feedback'))} />
          <PrivateRoute path="/" component={loadable(() => import('./pages/Game'))} />
          <Route path="*" component={loadable(() => import('./pages/Error404'))} />
        </Switch>
      </DefaultLayout>
    </Route>
  </Switch>
);

export default Routes;
