import type { RouteComponentProps } from 'react-router';
import Comment from '@/components/Comment';
import AddComment from '@/components/AddComment';
import forumData from '@/forumData';
import { IThread } from '@/models/forum';
import getDateTime from '@/utils/getDateTime';
import cssCommon from '@/styles/common.css';
import css from './index.css';

const Thread = ({ match: { params: { id } } }: RouteComponentProps<{ id: string }>) => {
  const thread = forumData.find((f) => f.id === Number(id));
  const {
    comments,
    createdAt,
    login,
    text,
    title,
  } = thread as IThread;

  return (
    <div className={cssCommon.pageHalfContent}>
      <h1 className={css.title}>{title}</h1>
      <div className={css.block}>
        <h2 className={cssCommon.visuallyHidden}>Общая информация о теме</h2>
        <div className={css.row}>
          Автор:
          {' '}
          {login}
        </div>
        <div className={css.row}>
          Создано
          {' '}
          <time>{getDateTime(createdAt)}</time>
        </div>
        <div className={css.text}>{text}</div>
      </div>
      {comments.length !== 0 && (
        <div className={css.block}>
          <h2 className={css.title}>Комментарии</h2>
          <ul>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                createdAt={comment.createdAt}
                login={comment.login}
                text={comment.text}
              />
            ))}
          </ul>
        </div>
      )}
      <AddComment id={id} />
    </div>
  );
};

export default Thread;
