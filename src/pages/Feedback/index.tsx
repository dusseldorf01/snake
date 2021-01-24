import { useEffect } from 'react';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { feedbackInitialModel, IFeedbackModel } from '@/models/feedback';

import validate from '@/utils/validate';
import { checkFormField } from '@/utils/checkFormField';

import cssForm from '@/styles/form.css';
import cssCommon from '@/styles/common.css';

const Feedback = () => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    validateForm,
    values,
  } = useFormik<IFeedbackModel>({
    initialValues: feedbackInitialModel,
    validate: (v) => (
      validate<IFeedbackModel>({
        name: [checkFormField.requiredField(v.name)],
        email: [checkFormField.requiredField(v.email), checkFormField.email(v.email)],
        phone: [checkFormField.requiredField(v.phone), checkFormField.phone(v.phone)],
        message: [checkFormField.requiredField(v.message)],
      })
    ),
    onSubmit: (v) => {
      console.log(v);
    },
  });

  useEffect(() => {
    validateForm();
  }, []);

  return (
    <div className={cssCommon.pageHalfContent}>
      <form onSubmit={handleSubmit}>
        <h1 className={cssForm.appFormTitle}>Форма обратной связи</h1>
        <Input
          error={touched.name && errors.name}
          label="Имя"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
        />
        <Input
          error={touched.email && errors.email}
          label="Почта"
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        <Input
          error={touched.phone && errors.phone}
          label="Телефон"
          name="phone"
          type="tel"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
        />
        <Textarea
          error={touched.message && errors.message}
          label="Сообщение"
          name="message"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.message}
        />
        <button
          type="submit"
          className={cssForm.appFormButton}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Feedback;
