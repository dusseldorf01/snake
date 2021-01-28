import {
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import {
  IProfileSettingsModel,
} from '@/models/profileSettings';
import validate from '@/utils/validate';
import { checkFormField } from '@/utils/checkFormField';

import cssCommon from '@/styles/common.css';
import cssForm from '@/styles/form.css';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector, userSettingsStateSelector } from '@/selectors/user';
import { userAvatarActions, userDataActions, userPasswordActions } from '@/actions/user';
import Alert from '@/components/Alert';

const ProfileSettings = () => {
  let inputFile:HTMLInputElement;

  const dispatch = useDispatch();
  const {
    avatar = '',
    email = '',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    first_name = '',
    login = '',
    phone = '',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    second_name = '',
  } = useSelector(userStateSelector).data;

  const userData = {
    // eslint-disable-next-line no-nested-ternary
    avatar: (typeof avatar === 'string') ? avatar : '',
    login: (typeof login === 'string') ? login : '',
    email: (typeof email === 'string') ? email : '',
    phone: (typeof phone === 'string') ? phone : '',
    firstName: (typeof first_name === 'string') ? first_name : '',
    secondName: (typeof second_name === 'string') ? second_name : '',
    oldPassword: '',
    newPassword: '',
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    validateForm,
    values,
  } = useFormik<IProfileSettingsModel>({
    initialValues: userData,
    validate: (v) => (
      validate<IProfileSettingsModel>({
        avatar: [checkFormField.avatar(inputFile)],
        firstName: [checkFormField.requiredField(v.firstName)],
        secondName: [checkFormField.requiredField(v.secondName)],
        login: [checkFormField.requiredField(v.login)],
        email: [checkFormField.requiredField(v.email), checkFormField.email(v.email)],
        phone: [checkFormField.requiredField(v.phone), checkFormField.phone(v.phone)],
        newPassword: [checkFormField.newPassword(v.newPassword, v.oldPassword)],
      })
    ),
    onSubmit: (v) => {
      if (inputFile) {
        const formData = new FormData();
        const fileElm :HTMLInputElement|null = inputFile;
        if (fileElm && fileElm.files && fileElm.files[0]) {
          const file = fileElm.files[0];
          formData.append('avatar', file);
          // eslint-disable-next-line no-param-reassign
          v.avatar = formData;
        }
      }

      const {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        avatar,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        firstName, secondName, displayName = '', login, email, phone,
        newPassword, oldPassword,
      } = v;

      dispatch(
        userDataActions.request({
          params: {
            data: {
              first_name: firstName,
              second_name: secondName,
              display_name: displayName,
              login,
              email,
              phone,
            },
          },
        }),
      );

      if (newPassword && oldPassword) {
        dispatch(
          userPasswordActions.request({
            params: {
              data: {
                oldPassword,
                newPassword,
              },
            },
          }),
        );
      }

      if (typeof avatar === 'object') {
        dispatch(
          userAvatarActions.request({
            params: {
              data: avatar,
            },
          }),
        );
      }
    },
  });

  useEffect(() => {
    validateForm();
  }, []);

  const { password, other } = useSelector(userSettingsStateSelector);
  const avatarUpdateState = useSelector(userSettingsStateSelector).avatar;
  const passwordError = (password.status === 400) ? password.data : password.error;

  return (
    <div className={cssCommon.pageHalfContent}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h1 className={cssForm.appFormTitle}>Изменение данных профиля</h1>
        <Input
          error={(touched.avatar && errors.avatar) || avatarUpdateState.error}
          name="avatar"
          type="file"
          onBlur={handleBlur}
          avatarImage={avatarUpdateState.data.avatar || values.avatar}
          onChange={handleChange}
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
          error={touched.newPassword && errors.oldPassword}
          label="Пароль старый"
          name="oldPassword"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.oldPassword}
        />
        <Input
          error={touched.newPassword && errors.newPassword}
          label="Пароль новый"
          name="newPassword"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.newPassword}
        />
        {
          passwordError && (<Alert>{passwordError}</Alert>)
        }
        {
          other.error && (<Alert>{other.error}</Alert>)
        }
        <button
          type="submit"
          className={cssForm.appFormButton}
        >
          Изменить данные
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
