import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userIsAuthorizedSelector } from '@/selectors/user';

const PrivateRoute = ({ component, ...props }:RouteProps) => {
  const isAuthorized = useSelector(userIsAuthorizedSelector);
  return (
    <Route
      {...props}
      component={isAuthorized ? component : () => (
        <Redirect to={{
          pathname: '/login',
          search: `?back_url=${encodeURI(`${props.location!.pathname}${props.location!.search}`)}`,
        }}
        />
      )}
    />
  );
};

export default PrivateRoute;
