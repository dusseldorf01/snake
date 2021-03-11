import {
  useCallback,
  useMemo,
} from 'react';
import classnames from 'classnames';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import Comment from '@/components/Comment';
import AddComment from '@/components/AddComment';
import getDateTime from '@/utils/getDateTime';
import withDataLoader from '@/hocs/withDataLoader';
import postActions from '@/actions/post';
import postSelector from '@/selectors/post';
import mapToCamelCase from '@/utils/mapToCamelCase';
import cssCommon from '@/styles/common.css';
import css from './index.css';

const Post = () => {
  const { data, updatingLike } = useSelector(postSelector);

  const {
    id,
    comments,
    createdAt,
    likes,
    text,
    title,
    user,
  } = data;

  const { data: { id: userId } } = useSelector(userStateSelector);

  const {
    firstName,
    secondName,
    displayName,
  } = useMemo(() => (mapToCamelCase(user)), [user]);

  const authorLabel = `Автор: ${displayName || `${firstName} ${secondName}`}`;

  const createdAtLabel = useMemo(() => (
    <>
      Создано:
      {' '}
      <time>{getDateTime(createdAt)}</time>
    </>
  ), [createdAt]);

  const isLikePost = useMemo(() => (
    likes.find((like) => like.userId === userId)
  ), [likes]);

  const likeClassNames = classnames(
    css.postLikeButton,
    isLikePost && css.postLikeButtonActive,
  );

  const dispatch = useDispatch();

  const onLikeButtonClick = useCallback(() => (
    isLikePost ? (
      dispatch(postActions.likeDeleteRequest(id))
    ) : (
      dispatch(postActions.likeAddRequest(id))
    )
  ), [isLikePost]);

  return (
    <div className={cssCommon.pageHalfContent}>
      <h1 className={css.postTitle}>{title}</h1>
      <div className={css.postBlock}>
        <h2 className={cssCommon.visuallyHidden}>Общая информация о теме</h2>
        <div className={css.postRow}>
          {authorLabel}
        </div>
        <div className={css.postRow}>
          {createdAtLabel}
        </div>
        <div className={css.postText}>{text}</div>
        <div className={classnames(css.postLike, css.postRow)}>
          <div>
            Всего лайков:
            {' '}
            {likes.length}
          </div>
          <button
            aria-label={isLikePost ? 'Убрать лайк' : 'Поставить лайк'}
            className={likeClassNames}
            disabled={updatingLike}
            onClick={onLikeButtonClick}
            type="button"
          />
        </div>
      </div>
      {comments.length !== 0 && (
        <div className={css.postBlock}>
          <h2 className={css.postTitle}>Комментарии</h2>
          <ul>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                childrenComments={comment.children}
                createdAt={comment.createdAt}
                isSelected={comment.isSelected}
                id={comment.id}
                postId={id}
                text={comment.text}
                user={comment.user}
              />
            ))}
          </ul>
        </div>
      )}
      <AddComment postId={id} />
    </div>
  );
};

export default withDataLoader(postSelector)(Post);
