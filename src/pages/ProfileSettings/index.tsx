import {
  FunctionComponent,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import RegistrationInput from '@/components/RegistrationInput';
import {
  IProfileSettingsModel,
  profileSettingsInitialModel,
} from '@/models/profileSettings';
import validate from '@/utils/validate';
import isRequired from '@/utils/isRequired';
import isPhone from '@/utils/isPhone';
import isEmail from '@/utils/isEmail';
import areEqualPasswords from '@/utils/areEqualPasswords';
import AvatarSettings from '@/components/AvatarSettings';

import '@/styles/form.css';
import './index.css';

const ProfileSettings: FunctionComponent<{}> = () => {
  let inputFile:HTMLInputElement;
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    validateForm,
    values,
  } = useFormik<IProfileSettingsModel>({
    initialValues: profileSettingsInitialModel,
    validate: (v) => (
      validate<IProfileSettingsModel>({
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
      if (inputFile) {
        const formData = new FormData();
        const fileElm :HTMLInputElement = inputFile;
        if (fileElm && fileElm.files) {
          const file = fileElm.files[0];
          formData.append('avatar', file);
        }
      }

      console.log(v);
    },
  });

  useEffect(() => {
    validateForm();
  }, []);

  return (
    <div className="center-content">
      <form
        className="profile-settings-form"
        onSubmit={handleSubmit}
      >
        <h1 className="app-form__title">Изменение данных профиля</h1>

        <AvatarSettings
          name="avatar"
          onChange={handleChange}
          value={values.avatar}
          /* eslint-disable-next-line no-return-assign */
          inputFile={(element:HTMLInputElement) => inputFile = element}
        />

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
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        <RegistrationInput
          error={touched.passwordRepeat && errors.passwordRepeat}
          label="Пароль (еще раз)"
          name="passwordRepeat"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordRepeat}
        />
        <button
          type="submit"
          className="app-form__button"
        >
          Изменить данные
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
