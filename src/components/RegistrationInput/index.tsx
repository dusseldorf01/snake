import {

  memo,
} from 'react';
import { IRegistrationInput } from './interfaces';
import css from './index.css';

const RegistrationInput = ({
  error,
  label,
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
}: IRegistrationInput) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={`${css.registrationInput} ${value ? css.registrationInputWithValue : ''}`}>
    <input
      className={css.registrationInputField}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      value={value}
    />
    <span className={css.registrationInputLabel}>{label}</span>
    {error && (
      <span className={css.registrationInputError}>{error}</span>
    )}
  </label>
);

export default memo(RegistrationInput);
