import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import type { IFeedbackCreateModel } from '@/models/feedback';
import validate from '@/utils/validators/validate';
import { checkFormField } from '@/utils/validators/checkFormField';
import cssForm from '@/styles/form.css';
import cssCommon from '@/styles/common.css';
import feedbackActions from '@/actions/feedback';
import feedbackSelector from '@/selectors/feedback';
import Button from '@/components/Button';

const Feedback = () => {
  const dispatch = useDispatch();

  const {
    data,
    loading,
    status,
  } = useSelector(feedbackSelector);

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    resetForm,
    touched,
    validateForm,
    values,
  } = useFormik<IFeedbackCreateModel>({
    initialValues: data,
    validate: (v) => (
      validate<IFeedbackCreateModel>({
        title: [checkFormField.requiredField(v.title)],
        message: [checkFormField.requiredField(v.message)],
      })
    ),
    onSubmit: (v) => {
      dispatch(feedbackActions.request({ params: { data: v } }));
    },
  });

  useEffect(() => {
    validateForm();
  }, []);

  useEffect(() => {
    if (status === 200) {
      resetForm();
    }
  }, [data]);

  return (
    <div className={cssCommon.pageHalfContent}>
      <form onSubmit={handleSubmit}>
        <h1 className={cssForm.appFormTitle}>Форма обратной связи</h1>
        <Input
          error={touched.title && errors.title}
          label="Тема"
          name="title"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.title}
        />
        <Textarea
          error={touched.message && errors.message}
          label="Сообщение"
          name="message"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.message}
        />
        <Button
          disabled={loading || !isValid}
          label="Отправить"
        />
      </form>
    </div>
  );
};

export default Feedback;
