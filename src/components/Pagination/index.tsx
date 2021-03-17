import {
  memo,
  useMemo,
} from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import postsListSelector from '@/selectors/postsList';
import createNumberArray from '@/utils/createNumberArray';
import type { IPaginationButton } from './interfaces';
import css from './index.css';

const PaginationButton = memo(({
  active,
  children,
  item,
  label,
}: IPaginationButton) => {
  const { pathname } = useLocation();

  const itemClassNames = classnames(css.paginationItem, active && css.paginationItemActive);

  const linkPage = `${pathname}?page=${item}`;

  return (
    <li className={itemClassNames}>
      {!active ? (
        <Link
          aria-label={label}
          className={css.paginationButton}
          to={linkPage}
        >
          {children || item}
        </Link>
      ) : (
        <div className={css.paginationButton}>
          {children || item}
        </div>
      )}
    </li>
  );
});

const Pagination = () => {
  const {
    data: { total: totalCountPosts },
    limit,
    page,
  } = useSelector(postsListSelector);

  const total = Math.ceil(totalCountPosts / limit);

  const pages = useMemo(() => createNumberArray(total), [total]);

  return (
    <ul
      className={css.pagination}
      aria-label="Пагинация"
      role="navigation"
    >
      <PaginationButton
        active={page === 1}
        item={page - 1}
        label="Предыдущая страница"
      >
        <span
          className={classnames(css.paginationButtonArrow, css.paginationButtonArrowNext)}
        />
      </PaginationButton>
      {pages.map((item) => (
        <PaginationButton
          key={item}
          active={item === page}
          item={item}
          label={`Страница ${item}`}
        />
      ))}
      <PaginationButton
        active={page === total}
        item={page + 1}
        label="Следующая страница"
      >
        <span
          className={classnames(css.paginationButtonArrow, css.paginationButtonArrowPrev)}
        />
      </PaginationButton>
    </ul>
  );
};

export default Pagination;
