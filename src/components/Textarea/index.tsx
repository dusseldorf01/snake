import { memo } from 'react';
import cssForm from '@/styles/form.css';
import { IFormTextarea } from './interfaces';
import cssTextarea from './index.css';

const Textarea = ({
  label,
  name,
  onChange,
  onBlur,
  value,
  error,
}: IFormTextarea) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={`${cssForm.inputGroup} ${value ? cssForm.inputGroupWithValue : ''}`}>
    <textarea
      className={`${cssForm.inputGroupInput} ${cssTextarea.formMessage}`}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
    <span className={cssForm.inputGroupLabel}>{label}</span>
    {error && (
      <span className={cssForm.inputGroupError}>{error}</span>
    )}
  </label>
);

export default memo(Textarea);
