import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileComponent from '@/components/Profile';
import ProfilePropertyValue from '@/components/ProfilePropertyValue';

const Profile: FunctionComponent<{}> = () => (
  <ProfileComponent
    displayName="Test 123"
    title="Профиль"
  >
    <>
      <div className="profile__section">
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
      <div className="profile__section">
        <NavLink
          className="profile__link"
          to="/profile/edit"
        >
          Изменить данные
        </NavLink>
        <button
          className="profile__logout"
          type="button"
          onClick={() => console.log('logout')}
        >
          Выйти
        </button>
      </div>
    </>
  </ProfileComponent>
);

export default Profile;
