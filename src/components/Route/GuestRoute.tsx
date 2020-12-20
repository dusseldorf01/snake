import { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const GuestRoute:FunctionComponent<RouteProps> = ({ component, ...props }:RouteProps) => {
  const isAuthorized = true;
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
