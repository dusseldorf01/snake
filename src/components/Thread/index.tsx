import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IThread } from '@/models/forum';
import getDateTime from '@/utils/getDateTime';
import getCommentsLabel from '@/utils/getCommentsLabel';
import css from './index.css';

const Thread = ({
  id,
  createdAt,
  comments,
  login,
  title,
}: Omit<IThread, 'text'>) => {
  const message = useMemo(() => (
    <>
      Создано
      {' '}
      <time>{getDateTime(createdAt)}</time>
      {' '}
      пользователем
      {' '}
      {login}
    </>
  ), [login, createdAt]);

  return (
    <li className={css.thread}>
      <h3 className={css.threadTitle}>
        <Link to={`/forum/${id}`}>
          {title}
        </Link>
      </h3>
      <div className={css.threadRow}>
        {message}
      </div>
      <div className={css.threadRow}>
        {getCommentsLabel(comments.length)}
      </div>
    </li>
  );
};

export default Thread;
