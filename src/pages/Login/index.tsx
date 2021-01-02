import {
  FunctionComponent,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import RegistrationInput from '@/components/RegistrationInput';
import '@/styles/registration-form.css';
import validate from '@/utils/validate';
import isRequired from '@/utils/isRequired';
import { ILoginModel, loginInitialModel } from '@/models/login';
import { useDispatch, useSelector } from 'react-redux';
import { signInStateSelector } from '@/selectors/user';
import { signInActions } from '@/actions/user';

const Login: FunctionComponent<{}> = () => {
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
        login: [isRequired(v.login)],
        password: [isRequired(v.password)],
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
    <div className="center-content">
      <form
        className="registration-form"
        onSubmit={handleSubmit}
      >
        <h1 className="registration-form__title">Авторизация</h1>
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
          className="registration-form__button"
          disabled={signInState.loading}
        >
          Войти
        </button>
        <a
          href="/register"
          className="registration-form__link"
        >
          Зарегистрироваться
        </a>
      </form>
    </div>
  );
};

export default Login;
