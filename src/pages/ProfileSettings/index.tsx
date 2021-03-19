import {
  useEffect, useRef, useState,
} from 'react';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import {
  IProfileSettingsModel,
} from '@/models/profileSettings';
import validate from '@/utils/validators/validate';
import { checkFormField } from '@/utils/validators/checkFormField';
import shallowUserDataEqual from '@/utils/shallowUserDataEqual';

import cssCommon from '@/styles/common.css';
import cssForm from '@/styles/form.css';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector, userSettingsStateSelector } from '@/selectors/user';
import { userAvatarActions, userDataActions, userPasswordActions } from '@/actions/user';

const ProfileSettings = () => {
  const mounted = useRef<boolean>(false);

  let inputFile:HTMLInputElement;

  const dispatch = useDispatch();
  const oldData = useSelector(userStateSelector).data;
  const { password } = useSelector(userSettingsStateSelector);
  const avatarUpdateState = useSelector(userSettingsStateSelector).avatar;
  const userData = {
    avatar: (typeof oldData.avatar === 'string') ? oldData.avatar : '',
    login: (typeof oldData.login === 'string') ? oldData.login : '',
    email: (typeof oldData.email === 'string') ? oldData.email : '',
    phone: (typeof oldData.phone === 'string') ? oldData.phone : '',
    firstName: (typeof oldData.first_name === 'string') ? oldData.first_name : '',
    secondName: (typeof oldData.second_name === 'string') ? oldData.second_name : '',
    displayName: (typeof oldData.display_name === 'string') ? oldData.display_name : '',
    oldPassword: '',
    newPassword: '',
    passwordRepeat: '',
  };

  const [currentUserData, updateFormUserData] = useState({
    errors: {
      avatar: '',
    },
  });

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    touched,
    validateForm,
    values,
  } = useFormik<IProfileSettingsModel>({
    initialValues: userData,

    validate: (v) => (
      validate<IProfileSettingsModel>({
        firstName: [checkFormField.requiredField(v.firstName)],
        secondName: [checkFormField.requiredField(v.secondName)],
        login: [checkFormField.requiredField(v.login)],
        email: [checkFormField.requiredField(v.email), checkFormField.email(v.email)],
        phone: [checkFormField.requiredField(v.phone), checkFormField.phone(v.phone)],
        oldPassword: [checkFormField.newPassword(v.newPassword, v.oldPassword)],
        passwordRepeat: [checkFormField.passwordRepeat(v.newPassword, v.passwordRepeat)],
      })
    ),
    onSubmit: (v) => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        firstName, secondName, displayName = '', login, email, phone,
        newPassword, oldPassword,
      } = v;

      const data = {
        first_name: firstName,
        second_name: secondName,
        display_name: displayName,
        login,
        email,
        phone,
      };

      const oldUserData = {
        first_name: oldData.first_name,
        second_name: oldData.second_name,
        display_name: oldData.display_name,
        login: oldData.login,
        email: oldData.email,
        phone: oldData.phone,
      };

      if (!shallowUserDataEqual(data, oldUserData)) {
        dispatch(
          userDataActions.request({
            params: {
              data,
            },
          }),
        );
      }

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
    },
  });

  useEffect(() => {
    validateForm();
  }, []);

  const clearValues = (keys: (keyof IProfileSettingsModel)[]) => {
    keys.forEach((key) => {
      setFieldValue(key, undefined);
      setFieldTouched(key, false);
    });
  };

  useEffect(() => {
    if (mounted.current && password.status === 200) {
      clearValues(['oldPassword', 'newPassword', 'passwordRepeat']);
    }
  }, [password.status]);

  const onAvatarChange = () => {
    let avatar;
    if (inputFile) {
      if (checkFormField.avatar(inputFile)()) {
        updateFormUserData({
          errors: { avatar: checkFormField.avatar(inputFile)() },
        });
        return;
      }

      const formData = new FormData();
      const fileElm :HTMLInputElement|null = inputFile;
      if (fileElm && fileElm.files && fileElm.files[0]) {
        const file = fileElm.files[0];
        formData.append('avatar', file);
        avatar = formData;
      }
    }

    if (typeof avatar === 'object') {
      dispatch(
        userAvatarActions.request({
          params: {
            data: avatar,
          },
        }),
      );
      updateFormUserData({
        errors: {
          avatar: '',
        },
      });
    }
  };

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <div className={cssCommon.pageHalfContent}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h1 className={cssForm.appFormTitle}>Изменение данных профиля</h1>
        <Input
          error={(touched.avatar && errors.avatar) || avatarUpdateState.error}
          errorOnChangeAvatar={currentUserData.errors.avatar}
          name="avatar"
          type="file"
          onBlur={handleBlur}
          avatarImage={avatarUpdateState.data.avatar || values.avatar}
          onChange={onAvatarChange}
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
          error={touched.displayName && errors.displayName}
          label="Отображаемое имя"
          name="displayName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.displayName}
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
          className={cssForm.appFormButton}
        >
          Изменить данные
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
