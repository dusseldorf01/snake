import {
  memo,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import classnames from 'classnames';
import ReplyComment from '@/components/ReplyComment';
import getDateTime from '@/utils/getDateTime';
import mapToCamelCase from '@/utils/mapToCamelCase';
import type { ICommentComponent } from './interfaces';
import css from './index.css';

const Comment = ({
  id,
  isSelected,
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

  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoView();
    }
  }, [isSelected]);

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
      className={classnames(css.comment, isSelected && css.commentActive)}
      ref={ref}
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
              isSelected={child.isSelected}
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
