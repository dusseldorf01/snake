import { Suspense, useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Routes from '@/routes';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import { userInfoActions } from '@/actions/user';
import cssRoot from '@/styles/variables.css';
import cssCommon from '@/styles/common.css';
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

    const html = document.querySelector('html');
    html?.classList.add(cssRoot.light);
  }, []);

  return (
    <div className={cssCommon.pageContainer}>
      <ErrorBoundary>
        {userState.loading ? <AppLoader /> : (
          <Suspense fallback={<AppLoader />}>
            <Routes />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
};
