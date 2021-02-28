import {
  memo,
} from 'react';
import defaultAvatar from '@/components/Input/images/avatar.png';
import cssForm from '@/styles/form.css';
import { IFormInput } from './interfaces';
import cssInput from './index.css';
import { DEFAULT_API_DOMAIN } from '../../utils/api';

const Input = ({
  avatarImage,
  error,
  errorOnChangeAvatar,
  label,
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
  inputFile,
}: IFormInput) => {
  const srcImage = (avatarImage) ? DEFAULT_API_DOMAIN + avatarImage : defaultAvatar;

  return (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={`${cssForm.inputGroup} ${value ? cssForm.inputGroupWithValue : ''}`}>
      {
        (name === 'avatar') && (<img src={srcImage} alt="user avatar" className={cssInput.currentAvatar} />)
      }
      <input
        ref={inputFile}
        className={cssForm.inputGroupInput}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        value={value}
      />
      <span className={cssForm.inputGroupLabel}>{label}</span>
      {error && (
        <span className={cssForm.inputGroupError}>{error}</span>
      )}
      {errorOnChangeAvatar && (
        <span className={cssForm.inputGroupError}>{errorOnChangeAvatar}</span>
      )}
    </label>
  );
};

export default memo(Input);
