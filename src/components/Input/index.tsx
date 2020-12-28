import {
  FunctionComponent,
  memo,
} from 'react';
import { IFormInput } from './interfaces';
import './index.css';

const Input: FunctionComponent<IFormInput> = ({
  error,
  label,
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
}: IFormInput) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={`input-group${value ? ' input-group_with-value' : ''}`}>
    <input
      className="input-group__input"
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      value={value}
    />
    <span className="input-group__label">{label}</span>
    {error && (
      <span className="input-group__error">{error}</span>
    )}
  </label>
);

export default memo(Input);
