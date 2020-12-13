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
import checkRequiredFields from '@/utils/checkRequiredFields';
import isPhone from '@/utils/isPhone';
import isEmail from '@/utils/isEmail';

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
    validate: (v) => {
      const newErrors: Partial<Record<keyof IRegistrationModel, string>> = checkRequiredFields(v, ['phone', 'email', 'passwordRepeat']);

      if (v.phone === '') {
        newErrors.phone = 'Обязательное поле';
      } else if (!isPhone(v.phone)) {
        newErrors.phone = 'Укажите телефон в формате +7 XXX XXX XXXX';
      }

      if (v.email === '') {
        newErrors.email = 'Обязательное поле';
      } else if (!isEmail(v.email)) {
        newErrors.email = 'Укажите валидный email';
      }

      if (v.password !== v.passwordRepeat) {
        newErrors.passwordRepeat = 'Пароли не совпадают';
      }

      return newErrors;
    },
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
        <h1 className="registration-form__title">Регистрация</h1>
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
          Зарегистрироваться
        </button>
        <a
          href="/"
          className="registration-form__link"
        >
          Войти
        </a>
      </form>
    </div>
  );
};

export default Registration;
