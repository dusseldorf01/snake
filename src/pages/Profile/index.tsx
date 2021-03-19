import {
  useCallback,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '@/selectors/user';
import ProfileComponent from '@/components/Profile';
import ProfilePropertyValue from '@/components/ProfilePropertyValue';
import { signOutActions } from '@/actions/user';

import cssProfile from '@/components/Profile/index.css';
import cssProfileProp from '@/components/ProfilePropertyValue/index.css';
import cssCommon from '@/styles/common.css';

const Profile = () => {
  const dispatch = useDispatch();

  const onButtonClick = useCallback(() => {
    dispatch(signOutActions.request());
  }, []);

  const { data } = useSelector(userStateSelector);
  const {
    first_name: firstName,
    second_name: secondName,
    display_name: displayName,
    login,
    email,
    phone,
    avatar,
  } = data;

  return (
    <div className={cssCommon.pageHalfContent}>
      <ProfileComponent
        avatar={avatar}
        displayName={displayName || `${firstName} ${secondName}`}
        title="Профиль"
      >
        <>
          <div className={cssProfile.profileSection}>
            <ProfilePropertyValue
              title="Имя"
              value={firstName}
            />
            <ProfilePropertyValue
              title="Фамилия"
              value={secondName}
            />
            <ProfilePropertyValue
              title="Отображаемое имя"
              value={displayName || `${firstName} ${secondName}`}
            />
            <ProfilePropertyValue
              title="Логин"
              value={login}
            />
            <ProfilePropertyValue
              title="Почта"
              value={email}
            />
            <ProfilePropertyValue
              title="Телефон"
              value={phone}
            />
          </div>
          <div className={cssProfile.profileSection}>
            <NavLink
              className={cssProfileProp.profileLink}
              to="/profile/edit"
            >
              Изменить данные
            </NavLink>
            <button
              className={cssProfileProp.profileLogout}
              type="button"
              onClick={onButtonClick}
            >
              Выйти
            </button>
          </div>
        </>
      </ProfileComponent>
    </div>
  );
};

export default Profile;
