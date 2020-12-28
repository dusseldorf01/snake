import {
  CSSProperties, FunctionComponent, memo,
} from 'react';
import { IAvatrProps } from './interfaces';
import './index.css';
import defaultAvatar from './images/avatar.png';

const AvatarSettings: FunctionComponent<IAvatrProps> = ({
  error,
  name,
  onChange,
  value,
  inputFile,
}: IAvatrProps) => {
  const backImage: CSSProperties = {
    backgroundImage: `url(${value || defaultAvatar})`,
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="avatar-settings">
      <span style={backImage} className="current-avatar" />
      <input
        ref={inputFile}
        className="avatar-settings__input"
        name={name}
        onChange={onChange}
        type="file"
      />
      {error && (
        <span className="avatar-settings__error">{error}</span>
      )}
    </label>
  );
};

export default memo(AvatarSettings);
