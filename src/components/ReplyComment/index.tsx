import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useFormik } from 'formik';
import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import useToggle from '@/hooks/useToggle';
import postActions from '@/actions/post';
import postSelector from '@/selectors/post';
import type { IReplyComment } from './interfaces';
import css from './index.css';

const transitionClassNames: Partial<Record<keyof CSSTransitionClassNames, string>> = {
  enter: css.replyCommentFormEnter,
  enterActive: css.replyCommentFormEnterActive,
  exit: css.replyCommentFormExit,
  exitActive: css.replyCommentFormExitActive,
};

const ReplyComment = ({
  childrenComments,
  parentId,
  postId,
}: IReplyComment) => {
  const [isOpen, isOpenToggle] = useToggle();

  const dispatch = useDispatch();

  const { addingComment } = useSelector(postSelector);

  const {
    dirty,
    isValid,
    handleChange,
    handleSubmit,
    resetForm,
    values: { text },
  } = useFormik<{ text: string }>({
    initialValues: { text: '' },
    onSubmit: (v) => {
      dispatch(postActions.addCommentRequest({ parentId, postId, ...v }));
    },
    validate: (v) => {
      if (v.text === '') {
        return { text: true };
      }

      return {};
    },
  });

  useEffect(() => {
    resetForm();
    if (isOpen) {
      isOpenToggle();
    }
  }, [childrenComments]);

  return (
    <div>
      <button
        type="button"
        className={css.replyCommentButton}
        onClick={isOpenToggle}
      >
        {isOpen ? 'Скрыть' : 'Ответить'}
      </button>
      <CSSTransition
        classNames={transitionClassNames}
        in={isOpen}
        timeout={200}
        unmountOnExit
      >
        <form
          className={css.replyCommentForm}
          onSubmit={handleSubmit}
        >
          <input
            autoComplete="off"
            className={css.replyCommentInput}
            name="text"
            onChange={handleChange}
            placeholder="Ответ на комментарий"
            type="text"
            value={text}
          />
          <button
            aria-label="Отправить ответ на комментарий"
            disabled={addingComment || !dirty || !isValid}
            type="submit"
            className={css.replyCommentFormSubmit}
          >
            <svg x="0px" y="0px" width="1em" height="1em" viewBox="0 0 535.5 535.5">
              <polygon xmlns="http://www.w3.org/2000/svg" points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75 " />
            </svg>
          </button>
        </form>
      </CSSTransition>
    </div>
  );
};

export default ReplyComment;
