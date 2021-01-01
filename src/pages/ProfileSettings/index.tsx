import {
  FunctionComponent,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import {
  IProfileSettingsModel,
  profileSettingsInitialModel,
} from '@/models/profileSettings';
import validate from '@/utils/validate';
import { checkFormField } from '@/utils/checkFormField';
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
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        <Input
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
