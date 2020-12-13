import { FunctionComponent } from 'react';
import { IProfile } from './interfaces';
import defaultAvatar from './images/avatar.png';
import './index.css';

const Profile: FunctionComponent<IProfile> = ({
  avatar = defaultAvatar,
  children,
  displayName,
  title,
}: IProfile) => (
  <div className="profile">
    <h1 className="visually-hidden">{title}</h1>
    <img
      src={avatar}
      alt={`Аватар пользователя ${displayName}`}
      width="131"
      height="131"
      className="profile__avatar"
    />
    <div className="profile__title">{displayName}</div>
    {children}
  </div>
);

export default Profile;
