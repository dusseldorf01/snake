import { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userIsAuthorizedSelector } from '@/selectors/user';

const GuestRoute:FunctionComponent<RouteProps> = ({ component, ...props }:RouteProps) => {
  const isAuthorized = useSelector(userIsAuthorizedSelector);
  const renderRedirect = () => (
    <Redirect to={{
      pathname: '/',
    }}
    />
  );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} component={isAuthorized ? renderRedirect : component} />;
};

export default GuestRoute;
