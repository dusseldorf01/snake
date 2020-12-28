import { FunctionComponent, memo } from 'react';
import { IFeedbackInputProps } from './interfaces';
import './index.css';

const FeedbackInput: FunctionComponent<IFeedbackInputProps> = ({
  error,
  label,
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
  pattern,
}: IFeedbackInputProps) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={`feedback-input${value ? ' feedback-input_with-value' : ''}`}>
    <input
      className="feedback-input__input"
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      pattern={pattern}
      value={value}
    />
    <span className="feedback-input__label">{label}</span>
    {error && (
    <span className="feedback-input__error">{error}</span>
    )}
  </label>
);

export default memo(FeedbackInput);
