import { Suspense, useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Routes from '@/routes';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import { userInfoActions } from '@/actions/user';
import Loader from './Loader';
import Header from './Header';

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
              <Routes />
            </Suspense>
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
};
