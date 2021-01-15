import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Logo: FunctionComponent<{}> = () => (
  <NavLink
    to="/"
    className="logo"
  >
    Змейка
  </NavLink>
);

export default Logo;
