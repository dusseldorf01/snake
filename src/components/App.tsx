import { Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import routes, { IRoute } from '@/routes';
import ErrorBoundary from '@/components/ErrorBoundary';
import GuestRoute from '@/components/Route/GuestRoute';
import PrivateRoute from '@/components/Route/PrivateRoute';
import Header from './Header';
import Loader from './Loader';

const renderRoute = (route:IRoute) => {
  let RouteComponent;
  switch (route.type) {
    case 'guest':
      RouteComponent = GuestRoute;
      break;
    case 'private':
      RouteComponent = PrivateRoute;
      break;
    default:
      RouteComponent = Route;
      break;
  }

  return (
    <RouteComponent
      key={route.path || '404'}
      exact={!!route.exact}
      path={route.path}
      component={route.view}
    />
  );
};

export default () => (
  <div className="page-container">
    <Header />
    <main className="page-content">
      <ErrorBoundary>
        <Suspense
          fallback={(
            <div className="center-content">
              <Loader />
            </div>
          )}
        >
          <Switch>
            {routes.map(renderRoute)}
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </main>
  </div>
);
