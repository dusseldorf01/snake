import { DEFAULT_API_DOMAIN } from '@/utils/api';
import cssCommon from '@/styles/common.css';
import { IProfile } from './interfaces';
import defaultAvatar from './images/avatar.png';
import css from './index.css';

const Profile = ({
  avatar,
  children,
  displayName,
  title,
}: IProfile) => (
  <div className={css.profile}>
    <h1 className={cssCommon.visuallyHidden}>{title}</h1>
    <img
      src={avatar ? `${DEFAULT_API_DOMAIN}${avatar}` : defaultAvatar}
      alt={`Аватар пользователя ${displayName}`}
      width="131"
      height="131"
      className={css.profileAvatar}
    />
    <div className={css.profileTitle}>{displayName}</div>
    {children}
  </div>
);

export default Profile;
