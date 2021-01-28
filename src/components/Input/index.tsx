import {
  CSSProperties,
  memo,
} from 'react';
import defaultAvatar from '@/components/Input/images/avatar.png';
import cssForm from '@/styles/form.css';
import { IFormInput } from './interfaces';
import cssInput from './index.css';

const Input = ({
  avatarImage,
  error,
  label,
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
  inputFile,
}: IFormInput) => {
  const backImage: CSSProperties = {
    backgroundImage: (avatarImage) ? `url(https://ya-praktikum.tech/${avatarImage})` : `url(${defaultAvatar})`,
  };

  return (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={`${cssForm.inputGroup} ${value ? cssForm.inputGroupWithValue : ''}`}>
      {
        (name === 'avatar') && (<span style={backImage} className={cssInput.currentAvatar} />)
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
    </label>
  );
};

export default memo(Input);
