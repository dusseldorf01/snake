import { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userIsAuthorizedSelector } from '@/selectors/user';

const GuestRoute:FunctionComponent<RouteProps> = ({ component, ...props }:RouteProps) => {
  const isAuthorized = useSelector(userIsAuthorizedSelector);

  return (
    <Route
      {...props}
      component={isAuthorized ? () => (
        <Redirect to={{
          pathname: '/',
        }}
        />
      ) : component}
    />
  );
};

export default GuestRoute;
