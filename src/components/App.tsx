import { Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import routes, { IRoute } from '@/routes';
import ErrorBoundary from '@/components/ErrorBoundary';
import css from '@/styles/index.css';
import Header from './Header';
import Loader from './Loader';

export default () => (
  <div className={css.pageContainer}>
    <Header />
    <main className={css.pageContent}>
      <ErrorBoundary>
        <Suspense
          fallback={(
            <div className={css.centerContent}>
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
      </ErrorBoundary>
    </main>
  </div>
);
