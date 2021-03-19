import { NavLink } from 'react-router-dom';
import withThemeSwitcher from '@/hocs/withThemeSwitcher';
import React from 'react';
import {
  IMenu,
  IMenuItem,
} from './interfaces';
import css from './index.css';

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

const Menu = ({
  Switcher,
}: IMenu) => (
  <div className={css.menuContainer}>
    <nav className={css.menu}>
      {menu.map(({ title, path }) => (
        <NavLink
          className={css.menuItem}
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

export default withThemeSwitcher(Menu);
