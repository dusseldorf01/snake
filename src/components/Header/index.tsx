import { FunctionComponent } from 'react';
import Logo from '../Logo';
import Menu from '../Menu';
import './index.css';

const Header: FunctionComponent<{}> = () => (
  <header className="header">
    <Logo />
    <Menu />
  </header>
);

export default Header;
