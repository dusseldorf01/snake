import { PureComponent, CSSProperties } from 'react';
import { IAvatrProps } from './interfaces';
import './index.css';
import defaultAvatar from './images/avatar.png';

export default class AvatarSettings extends PureComponent <IAvatrProps, {}> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props:IAvatrProps) {
    super(props);
  }

  render() {
    const {
      error,
      label,
      name,
      onChange,
      value,
      inputFile,
    } = this.props;

    const backImage: CSSProperties = {
      backgroundImage: `url(${value || defaultAvatar})`,
    };

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className="feedback-input feedback-input_with-value">
        <div style={backImage} className="current-avatar" />
        <input
          ref={inputFile}
          className="feedback-input__input avatar-file-input"
          name={name}
          onChange={onChange}
          type="file"
        />
        <span className="feedback-input__label">{label}</span>
        {error && (
          <span className="feedback-input__error">{error}</span>
        )}
      </label>
    );
  }
}
