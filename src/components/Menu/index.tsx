import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import withThemeSwitcher from '@/hocs/withThemeSwitcher';
import {
  IMenu,
  IMenuItem,
} from './interfaces';
import './index.css';

const Menu: FunctionComponent<IMenu> = ({
  Switcher,
}: IMenu) => {
  const menu: IMenuItem[] = [{
    title: 'Игра',
    path: '/',
  }, {
    title: 'Профиль',
    path: '/profile',
  }, {
    title: 'Таблица лидеров',
    path: '/leaderboard',
  }, {
    title: 'Форум',
    path: '/forum',
  }, {
    title: 'Обратная связь',
    path: '/feedback',
  }];

  return (
    <div className="menu-container">
      <nav className="menu">
        {menu.map(({ title, path }) => (
          <NavLink
            className="menu__item"
            key={title}
            to={path}
          >
            {title}
          </NavLink>
        ))}
      </nav>
      <Switcher />
    </div>
  );
};

export default withThemeSwitcher(Menu);
