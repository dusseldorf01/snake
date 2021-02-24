import {
  memo,
  useMemo,
} from 'react';
import ReplyComment from '@/components/ReplyComment';
import getDateTime from '@/utils/getDateTime';
import mapToCamelCase from '@/utils/mapToCamelCase';
import type { ICommentComponent } from './interfaces';
import css from './index.css';

const Comment = ({
  id,
  childrenComments,
  createdAt,
  postId,
  text,
  user,
}: ICommentComponent) => {
  const {
    firstName,
    secondName,
    displayName,
  } = useMemo(() => (mapToCamelCase(user)), [user]);

  const message = useMemo(() => (
    <>
      {displayName || `${firstName} ${secondName}`}
      {' '}
      написал
      {' '}
      <time>{getDateTime(createdAt)}</time>
    </>
  ), [createdAt, user]);

  return (
    <li
      id={`comment-${id}`}
      className={css.comment}
    >
      <div className={css.commentHeader}>
        {message}
      </div>
      <div className={css.commentContent}>{text}</div>
      <ReplyComment
        childrenComments={childrenComments}
        parentId={id}
        postId={postId}
      />
      {childrenComments.length !== 0 && (
        <ul className={css.commentChildren}>
          {childrenComments.map((child) => (
            <Comment
              key={child.id}
              childrenComments={child.children}
              createdAt={child.createdAt}
              id={child.id}
              postId={postId}
              text={child.text}
              user={child.user}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(Comment);
