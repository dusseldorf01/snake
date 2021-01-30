import { useFormik } from 'formik';
import {
  creatingCommentInitialModel,
  ICreatingComment,
} from '@/models/forum';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import validate from '@/utils/validate';
import { checkFormField } from '@/utils/checkFormField';
import { IAddComment } from './interface';
import css from './index.css';

const AddComment = ({
  id,
}: IAddComment) => {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    touched,
    values: {
      text,
    },
  } = useFormik<ICreatingComment>({
    initialValues: creatingCommentInitialModel,
    onSubmit: (v) => {
      console.log(id, v);
    },
    validate: (v) => (
      validate<ICreatingComment>({
        text: [checkFormField.requiredField(v.text)],
      })
    ),
  });

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
          disabled={!isValid}
          label="Добавить"
        />
      </form>
    </div>
  );
};

export default AddComment;
