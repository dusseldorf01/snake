import { useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Routes from '@/routes';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import cssRoot from '@/styles/variables.css';
import cssCommon from '@/styles/common.css';
import { userInfoActions } from '@/actions/user';
import useDevServerEffect from '@/hooks/useDevServerEffect';
import Loader from './Loader';

const AppLoader = () => (
  <div className={cssCommon.centerContent}>
    <Loader />
  </div>
);

export default () => {
  const dispatch = useDispatch();
  const userState = useSelector(userStateSelector);

  useEffect(() => {
    const html = document.querySelector('html');
    html?.classList.add(cssRoot.light);
  }, []);

  useDevServerEffect(() => {
    dispatch(userInfoActions.request());
  }, []);

  return (
    <ErrorBoundary>
      {userState.loading ? <AppLoader /> : (
        <Routes />
      )}
    </ErrorBoundary>
  );
};
