import {
  FunctionComponent,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import {
  IRegistrationModel,
  registrationInitialModel,
} from '@/models/registration';
import '@/styles/form.css';
import validate from '@/utils/validate';
import { checkFormField } from '@/utils/checkFormField';

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
        firstName: [checkFormField.requiredField(v.firstName)],
        secondName: [checkFormField.requiredField(v.secondName)],
        login: [checkFormField.requiredField(v.login)],
        email: [checkFormField.requiredField(v.email), checkFormField.email(v.email)],
        phone: [checkFormField.requiredField(v.phone), checkFormField.phone(v.phone)],
        password: [checkFormField.requiredField(v.password)],
        passwordRepeat: [checkFormField.requiredField(v.passwordRepeat),
          checkFormField.passwordRepeat(v.password, v.passwordRepeat)],
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
        className="app-form"
        onSubmit={handleSubmit}
      >
        <h1 className="app-form__title">Регистрация</h1>
        <Input
          error={touched.firstName && errors.firstName}
          label="Имя"
          name="firstName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
        />
        <Input
          error={touched.secondName && errors.secondName}
          label="Фамилия"
          name="secondName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.secondName}
        />
        <Input
          error={touched.login && errors.login}
          label="Логин"
          name="login"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.login}
        />
        <Input
          error={touched.email && errors.email}
          label="Почта"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        <Input
          error={touched.phone && errors.phone}
          label="Телефон"
          name="phone"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
        />
        <Input
          error={touched.password && errors.password}
          label="Пароль"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        <Input
          error={touched.passwordRepeat && errors.passwordRepeat}
          label="Пароль (еще раз)"
          name="passwordRepeat"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordRepeat}
        />
        <button
          type="submit"
          className="app-form__button"
        >
          Зарегистрироваться
        </button>
        <a
          href="/"
          className="app-form__link"
        >
          Войти
        </a>
      </form>
    </div>
  );
};

export default Registration;
