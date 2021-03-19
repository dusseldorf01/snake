import {
  useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import RegistrationInput from '@/components/RegistrationInput';
import {
  IRegistrationModel,
  registrationInitialModel,
} from '@/models/registration';
import validate from '@/utils/validators/validate';
import { checkFormField } from '@/utils/validators/checkFormField';

import { useDispatch, useSelector } from 'react-redux';
import { signUpStateSelector } from '@/selectors/user';
import { signUpActions } from '@/actions/user';
import Alert from '@/components/Alert';

import cssForm from '@/styles/form.css';
import cssCommon from '@/styles/common.css';

const Registration = () => {
  const dispatch = useDispatch();
  const signUpState = useSelector(signUpStateSelector);
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
      const {
        firstName, secondName, login, email, password, phone,
      } = v;

      dispatch(
        signUpActions.request({
          params: {
            data: {
              first_name: firstName,
              second_name: secondName,
              login,
              email,
              password,
              phone,
            },
          },
        }),
      );
    },
  });

  useEffect(() => {
    validateForm();
  }, []);

  let signUpStateError;
  if (signUpState.data.reason && signUpState.error) signUpStateError = `${signUpState.data.reason}`;

  return (
    <div className={cssCommon.centerContent}>
      <form
        className={cssForm.appForm}
        onSubmit={handleSubmit}
      >
        <h1 className={cssForm.appFormTitle}>Регистрация</h1>
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
          type="password"
          error={touched.password && errors.password}
          label="Пароль"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        <RegistrationInput
          type="password"
          error={touched.passwordRepeat && errors.passwordRepeat}
          label="Пароль (еще раз)"
          name="passwordRepeat"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordRepeat}
        />
        <button
          type="submit"
          className={cssForm.appFormButton}
        >
          Зарегистрироваться
        </button>
        {
              signUpStateError && (<Alert>{signUpStateError}</Alert>)
            }
        <NavLink
          to="/login"
          className={cssForm.appFormLink}
        >
          Войти
        </NavLink>
      </form>
    </div>
  );
};

export default Registration;
