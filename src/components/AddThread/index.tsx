import { useFormik } from 'formik';
import {
  creatingThreadInitialModel,
  ICreatingThreadModel,
} from '@/models/forum';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import validate from '@/utils/validate';
import { checkFormField } from '@/utils/checkFormField';
import css from './index.css';

const AddThread = () => {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    touched,
    values: {
      text,
      title,
    },
  } = useFormik<ICreatingThreadModel>({
    initialValues: creatingThreadInitialModel,
    onSubmit: (v) => {
      console.log(v);
    },
    validate: (v) => (
      validate<ICreatingThreadModel>({
        text: [checkFormField.requiredField(v.text)],
        title: [checkFormField.requiredField(v.title)],
      })
    ),
  });

  return (
    <div className={css.addThread}>
      <h2 className={css.addTreadTitle}>Создание новой темы</h2>
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
          disabled={!isValid}
          label="Создать"
        />
      </form>
    </div>
  );
};

export default AddThread;
