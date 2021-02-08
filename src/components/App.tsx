import { useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Routes from '@/routes';
import { useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import cssRoot from '@/styles/variables.css';
import cssCommon from '@/styles/common.css';
import Loader from './Loader';

const AppLoader = () => (
  <div className={cssCommon.centerContent}>
    <Loader />
  </div>
);

export default () => {
  const userState = useSelector(userStateSelector);

  useEffect(() => {
    const html = document.querySelector('html');
    html?.classList.add(cssRoot.light);
  }, []);

  return (
    <ErrorBoundary>
      {userState.loading ? <AppLoader /> : (
        <Routes />
      )}
    </ErrorBoundary>
  );
};
