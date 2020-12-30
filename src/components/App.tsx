import { Suspense, useEffect } from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import routes, { IRoute } from '@/routes';
import ErrorBoundary from '@/components/ErrorBoundary';
import GuestRoute from '@/components/Route/GuestRoute';
import PrivateRoute from '@/components/Route/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import { userInfoActions } from '@/actions/user';
import Loader from './Loader';
import Header from './Header';

interface AppRouteProps {
  route: IRoute
}

const AppRoute = ({ route }: AppRouteProps) => {
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

const AppLoader = () => (
  <div className="center-content">
    <Loader />
  </div>
);

export default () => {
  const dispatch = useDispatch();
  const userState = useSelector(userStateSelector);

  useEffect(() => {
    dispatch(userInfoActions.request());
  }, []);

  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        <ErrorBoundary>
          {userState.loading ? <AppLoader /> : (
            <Suspense fallback={<AppLoader />}>
              <Switch>
                {routes.map((item) => <AppRoute key={item.path} route={item} />)}
              </Switch>
            </Suspense>
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
};
