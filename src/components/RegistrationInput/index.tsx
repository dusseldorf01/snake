import {
  FunctionComponent,
  memo,
} from 'react';
import { IRegistrationInput } from './interfaces';
import './index.css';

const RegistrationInput: FunctionComponent<IRegistrationInput> = ({
  error,
  label,
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
}: IRegistrationInput) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={`registration-input${value ? ' registration-input_with-value' : ''}`}>
    <input
      className="registration-input__input"
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      value={value}
    />
    <span className="registration-input__label">{label}</span>
    {error && (
      <span className="registration-input__error">{error}</span>
    )}
  </label>
);

export default memo(RegistrationInput);
