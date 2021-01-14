import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import css from './index.css';

const Logo: FunctionComponent<{}> = () => (
  <NavLink
    to="/"
    className={css.logo}
  >
    Змейка
  </NavLink>
);

export default Logo;
