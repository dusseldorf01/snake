import { Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import routes, { IRoute } from '@/routes';
import Header from './Header';
import Loader from './Loader';

export default () => (
  <div className="page-container">
    <Header />
    <main className="page-content">
      <Suspense
        fallback={(
          <div className="center-content">
            <Loader />
          </div>
        )}
      >
        <Switch>
          {routes.map(({
            exact,
            path,
            view,
          }: IRoute) => (
            <Route
              key={path || '404'}
              exact={!!exact}
              path={path}
              component={view}
            />
          ))}
        </Switch>
      </Suspense>
    </main>
  </div>
);