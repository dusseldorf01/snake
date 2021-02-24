import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { IPostPreview } from '@/models/forum';
import getDateTime from '@/utils/getDateTime';
import getCommentsLabel from '@/utils/getCommentsLabel';
import mapToCamelCase from '@/utils/mapToCamelCase';
import css from './index.css';

const PostPreview = ({
  id,
  createdAt,
  commentsCount,
  title,
  user,
}: IPostPreview) => {
  const {
    firstName,
    secondName,
    displayName,
  } = useMemo(() => (mapToCamelCase(user)), [user]);

  const message = useMemo(() => (
    <>
      Создано
      {' '}
      <time>{getDateTime(createdAt)}</time>
      {' '}
      пользователем
      {' '}
      {displayName || `${firstName} ${secondName}`}
    </>
  ), [createdAt, firstName, secondName, displayName]);

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
        {getCommentsLabel(commentsCount)}
      </div>
    </li>
  );
};

export default PostPreview;
