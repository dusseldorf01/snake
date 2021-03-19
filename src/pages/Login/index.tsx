import {
  useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import RegistrationInput from '@/components/RegistrationInput';

import { checkFormField } from '@/utils/validators/checkFormField';

import validate from '@/utils/validators/validate';

import { ILoginModel, loginInitialModel } from '@/models/login';
import { useDispatch, useSelector } from 'react-redux';
import { signInStateSelector } from '@/selectors/user';
import { signInActions } from '@/actions/user';
import Alert from '@/components/Alert';

import cssCommon from '@/styles/common.css';
import cssForm from '@/styles/form.css';
import OauthLink from '@/components/OAuthLink';
import ClientOnly from '@/components/ClientOnly';

const Login = () => {
  const dispatch = useDispatch();
  const signInState = useSelector(signInStateSelector);

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    validateForm,
    values,
  } = useFormik<ILoginModel>({
    initialValues: loginInitialModel,
    validate: (v) => (
      validate<ILoginModel>({
        login: [checkFormField.requiredField(v.login)],
        password: [checkFormField.requiredField(v.password)],
      })
    ),
    onSubmit: (v) => {
      dispatch(signInActions.request({ params: { data: v } }));
    },
  });

  useEffect(() => {
    validateForm();
  }, []);

  return (
    <div className={cssCommon.centerContent}>
      <form
        className={cssForm.appForm}
        onSubmit={handleSubmit}
      >
        <h1 className={cssForm.appFormTitle}>Авторизация</h1>
        <RegistrationInput
          error={touched.login && errors.login}
          label="Логин"
          name="login"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.login}
        />
        <RegistrationInput
          error={touched.password && errors.password}
          label="Пароль"
          type="password"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        <button
          type="submit"
          className={cssForm.appFormButton}
          disabled={signInState.loading}
        >
          Войти
        </button>
        {signInState.status === 401 && <Alert>Вы ввели неправильный логин или пароль</Alert>}
        <NavLink
          to="/register"
          className={cssForm.appFormLink}
        >
          Зарегистрироваться
        </NavLink>
        <ClientOnly>
          <OauthLink />
        </ClientOnly>
      </form>
    </div>
  );
};

export default Login;
