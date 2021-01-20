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
}: Omit<IThread, 'text'>) => (
  <li className={css.thread}>
    <h3 className={css.threadTitle}>
      <Link to={`/forum/${id}`}>
        {title}
      </Link>
    </h3>
    <div className={css.threadRow}>
      Создано
      {' '}
      <time>{getDateTime(createdAt)}</time>
      {' '}
      пользователем
      {' '}
      {login}
    </div>
    <div className={css.threadRow}>
      {getCommentsLabel(comments.length)}
    </div>
  </li>
);

export default Thread;
