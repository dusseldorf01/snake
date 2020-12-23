import { PureComponent } from 'react';
import { Formik } from 'formik';
import FeedbackInput from '@/components/Feedbackinput';
import FeedbackTextarea from '@/components/Feedbacktextarea';
import { feedbackInitialModel, IFeedbackModel } from '@/models/feedback';

import validate from '@/utils/validate';
import isRequired from '@/utils/isRequired';
import isEmail from '@/utils/isEmail';
import isPhone from '@/utils/isPhone';

import './index.css';

export default class Feedback extends PureComponent <IFeedbackModel, {}> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props:IFeedbackModel) {
    super(props);
  }

  render() {
    return (
      <div className="center-content">
        <Formik
          initialValues={feedbackInitialModel}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
          }}
          validate={(v) => (
            validate<IFeedbackModel>({
              name: [isRequired(v.name)],
              email: [isRequired(v.email), isEmail(v.email)],
              phone: [isRequired(v.email), isPhone(v.phone)],
            })
          )}

        >
          {(props) => (
            <form
              className="feedback-form"
              onSubmit={props.handleSubmit}
            >
              <h2 className="registration-form__title">Форма обратной связи</h2>
              <FeedbackInput
                error={props.touched.name && props.errors.name}
                label="Имя"
                name="name"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.name}
              />
              <FeedbackInput
                error={props.touched.email && props.errors.email}
                label="Почта"
                name="email"
                type="email"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.email}
              />
              <FeedbackInput
                error={props.touched.phone && props.errors.phone}
                label="Телефон"
                name="phone"
                type="tel"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.phone}
              />
              <FeedbackTextarea
                label="Сообщение"
                name="message"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.message}
              />
              <button
                type="submit"
                className="registration-form__button"
              >
                Отправить
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
