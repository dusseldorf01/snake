import { useMemo } from 'react';
import { IComment } from '@/models/forum';
import getDateTime from '@/utils/getDateTime';
import css from './index.css';

const Comment = ({
  createdAt,
  login,
  text,
}: Omit<IComment, 'id'>) => {
  const message = useMemo(() => (
    <>
      {login}
      {' '}
      написал
      {' '}
      <time>{getDateTime(createdAt)}</time>
    </>
  ), [login, createdAt]);

  return (
    <li className={css.comment}>
      <div className={css.commentHeader}>
        {message}
      </div>
      <div className={css.commentContent}>{text}</div>
    </li>
  );
};

export default Comment;
