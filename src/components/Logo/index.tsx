import { NavLink } from 'react-router-dom';
import css from './index.css';

const Logo = () => (
  <NavLink
    to="/"
    className={css.logo}
  >
    Змейка
  </NavLink>
);

export default Logo;
