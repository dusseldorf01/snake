import { Suspense, useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Routes from '@/routes';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import { userInfoActions } from '@/actions/user';
import Loader from './Loader';

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
    <ErrorBoundary>
      {userState.loading ? <AppLoader /> : (
        <Suspense fallback={<AppLoader />}>
          <Routes />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};
