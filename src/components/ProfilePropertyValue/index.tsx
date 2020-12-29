import { FunctionComponent } from 'react';
import { IProfilePropertyValue } from './interfaces';
import './index.css';

const ProfilePropertyValue: FunctionComponent<IProfilePropertyValue> = ({
  title,
  value,
}: IProfilePropertyValue) => (
  <div className="profile-property-value">
    <div className="profile-property-value__title">{title}</div>
    <div className="profile-property-value__value">{value}</div>
  </div>
);

export default ProfilePropertyValue;
