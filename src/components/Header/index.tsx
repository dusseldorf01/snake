import { FunctionComponent } from 'react';
import Logo from '../Logo';
import Menu from '../Menu';
import css from './index.css';

const Header: FunctionComponent<{}> = () => (
  <header className={css.header}>
    <Logo />
    <Menu />
  </header>
);

export default Header;
