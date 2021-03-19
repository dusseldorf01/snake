import { NavLink } from 'react-router-dom';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import type { IMenuItem } from './interfaces';
import css from './index.css';

const menu: IMenuItem[] = [{
  exact: true,
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

const Menu = () => (
  <div className={css.menuContainer}>
    <nav className={css.menu}>
      {menu.map(({ exact, title, path }) => (
        <NavLink
          activeClassName={css.menuItemActive}
          className={css.menuItem}
          exact={exact}
          key={title}
          to={path}
        >
          {title}
        </NavLink>
      ))}
    </nav>
    <ThemeSwitcher />
  </div>
);

export default Menu;
