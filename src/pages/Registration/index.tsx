import {
  useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import {
  IRegistrationModel,
  registrationInitialModel,
} from '@/models/registration';
import validate from '@/utils/validators/validate';
import { checkFormField } from '@/utils/validators/checkFormField';

import { useDispatch, useSelector } from 'react-redux';
import { signUpStateSelector } from '@/selectors/user';
import { signUpActions } from '@/actions/user';

import cssForm from '@/styles/form.css';
import cssCommon from '@/styles/common.css';
import Button from '@/components/Button';
import notification from '@/components/Notification';

const Registration = () => {
  const dispatch = useDispatch();
  const signUpState = useSelector(signUpStateSelector);
  const {
    isValid,
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

  useEffect(() => {
    if (signUpState.error) {
      const { reason } = signUpState.data;
      if (reason === 'Login already exists') {
        notification.error({ message: 'Пользователь с таким логином уже существует' });
      } else {
        notification.error({ message: reason || 'При регистрации возникла ошибка' });
      }
    }
  }, [signUpState]);

  return (
    <div className={cssCommon.centerContent}>
      <form
        className={cssForm.appForm}
        onSubmit={handleSubmit}
      >
        <h1 className={cssForm.appFormTitle}>Регистрация</h1>
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
          type="password"
          error={touched.password && errors.password}
          label="Пароль"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        <Input
          type="password"
          error={touched.passwordRepeat && errors.passwordRepeat}
          label="Пароль (еще раз)"
          name="passwordRepeat"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordRepeat}
        />
        <Button
          disabled={!isValid || signUpState.loading}
          label="Зарегистрироваться"
        />
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
