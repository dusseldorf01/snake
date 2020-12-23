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
import '@/styles/registration-form.css';
import validate from '@/utils/validate';
import isRequired from '@/utils/isRequired';
import isPhone from '@/utils/isPhone';
import isEmail from '@/utils/isEmail';
import areEqualPasswords from '@/utils/areEqualPasswords';
import AvatarSettings from '@/components/AvatarSettings';

const ProfileSettings: FunctionComponent<{}> = () => {
  const avatarInputFileID = 'avatar-input-file';

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
      if (document.querySelector(`#${avatarInputFileID}`)) {
        const formData = new FormData();
        const fileElm :HTMLInputElement|null = document.querySelector(`#${avatarInputFileID}`);
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
        className="registration-form"
        onSubmit={handleSubmit}
      >
        <h1 className="registration-form__title">Изменение данных профиля</h1>

        <AvatarSettings
          label="Аватар"
          name="avatar"
          onChange={handleChange}
          value={values.avatar}
          inputFileID={avatarInputFileID}
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

export default ProfileSettings;
