import {
  FunctionComponent,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import RegistrationInput from '@/components/RegistrationInput';
import {
  IRegistrationModel,
  registrationInitialModel,
} from '@/models/registration';
import '@/styles/registration-form.css';
import validate from '@/utils/validate';
import isRequired from '@/utils/isRequired';
import isPhone from '@/utils/isPhone';
import isEmail from '@/utils/isEmail';
import areEqualPasswords from '@/utils/areEqualPasswords';

const Registration: FunctionComponent<{}> = () => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    validateForm,
    values,
  } = useFormik<IRegistrationModel>({
    initialValues: registrationInitialModel,
    validate: (v) => (
      validate<IRegistrationModel>({
        firstName: [isRequired(v.firstName)],
        secondName: [isRequired(v.secondName)],
        login: [isRequired(v.login)],
        email: [isRequired(v.email), isEmail(v.email)],
        phone: [isRequired(v.phone), isPhone(v.phone)],
        password: [isRequired(v.password)],
        passwordRepeat: [areEqualPasswords(v.password, v.passwordRepeat)],
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
        className="registration-form"
        onSubmit={handleSubmit}
      >
        <h1 className="registration-form__title">Изменение данных профиля</h1>

        <RegistrationInput
          error={touched.firstName && errors.firstName}
          label="Имя"
          name="firstName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
        />
        <RegistrationInput
          error={touched.secondName && errors.secondName}
          label="Фамилия"
          name="secondName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.secondName}
        />
        <RegistrationInput
          error={touched.login && errors.login}
          label="Логин"
          name="login"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.login}
        />
        <RegistrationInput
          error={touched.email && errors.email}
          label="Почта"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        <RegistrationInput
          error={touched.phone && errors.phone}
          label="Телефон"
          name="phone"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
        />
        <RegistrationInput
          error={touched.password && errors.password}
          label="Пароль"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        <RegistrationInput
          error={touched.passwordRepeat && errors.passwordRepeat}
          label="Пароль (еще раз)"
          name="passwordRepeat"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordRepeat}
        />
        <button
          type="submit"
          className="registration-form__button"
        >
          Изменить данные
        </button>

      </form>
    </div>
  );
};

export default Registration;
