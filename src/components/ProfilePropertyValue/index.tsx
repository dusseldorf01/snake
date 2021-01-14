import { FunctionComponent } from 'react';
import { IProfilePropertyValue } from './interfaces';
import css from './index.css';

const ProfilePropertyValue: FunctionComponent<IProfilePropertyValue> = ({
  title,
  value,
}: IProfilePropertyValue) => (
  <div className={css.profilePropertyValue}>
    <div className={css.profilePropertyValueTitle}>{title}</div>
    <div className={css.profilePropertyValueVal}>{value}</div>
  </div>
);

export default ProfilePropertyValue;
