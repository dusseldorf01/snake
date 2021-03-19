import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useFormik } from 'formik';
import {
  commentCreateInitialModel,
  ICommentCreateModel,
} from '@/models/forum';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import validate from '@/utils/validators/validate';
import { checkFormField } from '@/utils/validators/checkFormField';
import postActions from '@/actions/post';
import postSelector from '@/selectors/post';
import type { IAddComment } from './interface';
import css from './index.css';

const AddComment = ({
  postId,
}: IAddComment) => {
  const dispatch = useDispatch();

  const { data: { comments } } = useSelector(postSelector);

  const {
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    resetForm,
    touched,
    values: {
      text,
    },
  } = useFormik<ICommentCreateModel>({
    initialValues: commentCreateInitialModel,
    onSubmit: (v) => {
      dispatch(postActions.addCommentRequest({ ...v, postId }));
    },
    validate: (v) => (
      validate<ICommentCreateModel>({
        text: [checkFormField.requiredField(v.text)],
      })
    ),
  });

  useEffect(() => {
    resetForm();
  }, [comments]);

  return (
    <div>
      <h3 className={css.addCommentTitle}>Добавление комментария</h3>
      <form onSubmit={handleSubmit}>
        <Textarea
          error={touched.text && errors.text}
          label="Комментарий"
          name="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={text}
        />
        <Button
          disabled={!dirty || !isValid}
          label="Добавить"
        />
      </form>
    </div>
  );
};

export default AddComment;
