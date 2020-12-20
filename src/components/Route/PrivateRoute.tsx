import { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute:FunctionComponent<RouteProps> = ({ component, ...props }:RouteProps) => {
  const isAuthorized = true;
  const renderRedirect = () => (
    <Redirect to={{
      pathname: '/login',
      search: `?back_url=${encodeURI(`${props.location!.pathname}${props.location!.search}`)}`,
    }}
    />
  );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} component={isAuthorized ? component : renderRedirect} />;
};

export default PrivateRoute;
