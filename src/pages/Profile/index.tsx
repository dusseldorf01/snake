import {
  FunctionComponent,
  useCallback,
} from 'react';
import { NavLink } from 'react-router-dom';
import ProfileComponent from '@/components/Profile';
import ProfilePropertyValue from '@/components/ProfilePropertyValue';

import cssProfile from '@/components/Profile/index.css';
import cssProfileProp from '@/components/ProfilePropertyValue/index.css';

const Profile: FunctionComponent<{}> = () => {
  const onButtonClick = useCallback(() => console.log('logout'), []);

  return (
    <ProfileComponent
      displayName="Test 123"
      title="Профиль"
    >
      <>
        <div className={cssProfile.profileSection}>
          <ProfilePropertyValue
            title="Имя"
            value="Имя"
          />
          <ProfilePropertyValue
            title="Фамилия"
            value="Фамилия"
          />
          <ProfilePropertyValue
            title="Отображаемое имя"
            value="Отображаемое имя"
          />
          <ProfilePropertyValue
            title="Логин"
            value="Логин"
          />
          <ProfilePropertyValue
            title="Почта"
            value="Почта"
          />
          <ProfilePropertyValue
            title="Телефон"
            value="Телефон"
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
  );
};

export default Profile;
