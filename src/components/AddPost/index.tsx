import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useFormik } from 'formik';
import {
  postCreateInitialModel,
  IPostCreateModel,
} from '@/models/forum';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import validate from '@/utils/validate';
import { checkFormField } from '@/utils/checkFormField';
import postsListActions from '@/actions/postsList';
import postsListSelector from '@/selectors/postsList';
import css from './index.css';

const AddPost = () => {
  const dispatch = useDispatch();

  const { updating, data: { items } } = useSelector(postsListSelector);

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
      title,
    },
  } = useFormik<IPostCreateModel>({
    initialValues: postCreateInitialModel,
    onSubmit: (v) => {
      dispatch(postsListActions.updateRequest(v));
    },
    validate: (v) => (
      validate<IPostCreateModel>({
        text: [checkFormField.requiredField(v.text)],
        title: [checkFormField.requiredField(v.title)],
      })
    ),
  });

  useEffect(() => {
    resetForm();
  }, [items]);

  return (
    <div className={css.addPost}>
      <h2 className={css.addPostTitle}>Создание новой темы</h2>
      <form onSubmit={handleSubmit}>
        <Input
          error={touched.title && errors.title}
          label="Заголовок"
          name="title"
          onBlur={handleBlur}
          onChange={handleChange}
          value={title}
        />
        <Textarea
          error={touched.text && errors.text}
          label="Сообщение"
          name="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={text}
        />
        <Button
          disabled={!dirty || !isValid || updating}
          label="Создать"
        />
      </form>
    </div>
  );
};

export default AddPost;
