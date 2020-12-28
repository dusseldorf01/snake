import {
  FunctionComponent, memo,
} from 'react';
import { IFormTextarea } from './interfaces';
import './index.css';

const Textarea: FunctionComponent<IFormTextarea> = ({
  label,
  name,
  onChange,
  onBlur,
  value,
  error,
}: IFormTextarea) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={`input-group${value ? ' input-group_with-value' : ''}`}>
    <textarea
      className="input-group__input form-message"
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
    <span className="input-group__label">{label}</span>
    {error && (
      <span className="input-group__error">{error}</span>
    )}
  </label>
);

export default memo(Textarea);
