import {
  useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import Input from '@/components/Input';

import { checkFormField } from '@/utils/validators/checkFormField';

import validate from '@/utils/validators/validate';

import { ILoginModel, loginInitialModel } from '@/models/login';
import { useDispatch, useSelector } from 'react-redux';
import { signInStateSelector } from '@/selectors/user';
import { signInActions } from '@/actions/user';

import cssCommon from '@/styles/common.css';
import cssForm from '@/styles/form.css';
import OauthLink from '@/components/OAuthLink';
import ClientOnly from '@/components/ClientOnly';
import notification from '@/components/Notification';
import Button from '@/components/Button';

const Login = () => {
  const dispatch = useDispatch();
  const signInState = useSelector(signInStateSelector);

  const {
    isValid,
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

  useEffect(() => {
    if (signInState.error) {
      const { reason } = signInState.data;
      if (reason === 'Login or password is incorrect') {
        notification.error({ message: 'Вы ввели неправильный логин или пароль' });
      } else {
        notification.error({ message: reason || 'При авторизации возникла ошибка' });
      }
    }
  }, [signInState]);

  return (
    <div className={cssCommon.centerContent}>
      <form
        className={cssForm.appForm}
        onSubmit={handleSubmit}
      >
        <h1 className={cssForm.appFormTitle}>Авторизация</h1>
        <Input
          error={touched.login && errors.login}
          label="Логин"
          name="login"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.login}
        />
        <Input
          error={touched.password && errors.password}
          label="Пароль"
          type="password"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        <Button
          disabled={!isValid || signInState.loading}
          label="Войти"
        />
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
