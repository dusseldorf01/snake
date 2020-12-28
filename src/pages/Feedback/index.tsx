import { FunctionComponent, useEffect } from 'react';
import { useFormik } from 'formik';
import FeedbackInput from '@/components/Feedbackinput';
import FeedbackTextarea from '@/components/Feedbacktextarea';
import { feedbackInitialModel, IFeedbackModel } from '@/models/feedback';

import validate from '@/utils/validate';
import isRequired from '@/utils/isRequired';
import isEmail from '@/utils/isEmail';
import isPhone from '@/utils/isPhone';

import '@/styles/form.css';
import './index.css';

const Feedback: FunctionComponent<{}> = () => {
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
        name: [isRequired(v.name)],
        email: [isRequired(v.email), isEmail(v.email)],
        phone: [isRequired(v.email), isPhone(v.phone)],
        message: [isRequired(v.message)],
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
    <div className="center-content">
      <form
        className="feedback-form"
        onSubmit={handleSubmit}
      >
        <h1 className="app-form__title ">Форма обратной связи</h1>
        <FeedbackInput
          error={touched.name && errors.name}
          label="Имя"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
        />
        <FeedbackInput
          error={touched.email && errors.email}
          label="Почта"
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        <FeedbackInput
          error={touched.phone && errors.phone}
          label="Телефон"
          name="phone"
          type="tel"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
        />
        <FeedbackTextarea
          error={touched.message && errors.message}
          label="Сообщение"
          name="message"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.message}
        />
        <button
          type="submit"
          className="app-form__button"
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Feedback;
