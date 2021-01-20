import { IComment } from '@/models/forum';
import getDateTime from '@/utils/getDateTime';
import css from './index.css';

const Comment = ({
  createdAt,
  login,
  text,
}: Omit<IComment, 'id'>) => (
  <li className={css.comment}>
    <div className={css.commentHeader}>
      {login}
      {' '}
      написал
      {' '}
      <time>{getDateTime(createdAt)}</time>
      :
    </div>
    <div className={css.commentContent}>{text}</div>
  </li>
);

export default Comment;
