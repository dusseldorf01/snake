import {
  FunctionComponent, memo,
} from 'react';
import { IFeedbackTextareaProps } from './interfaces';
import './index.css';

const FeedbackTextarea: FunctionComponent<IFeedbackTextareaProps> = ({
  label,
  name,
  onChange,
  onBlur,
  value,
  error,
}: IFeedbackTextareaProps) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={`feedback-textarea${value ? ' feedback-textarea_with-value' : ''}`}>
    <textarea
      className="feedback-textarea__input feedback-message"
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
    <span className="feedback-textarea__label">{label}</span>
    {error && (
      <span className="feedback-textarea__error">{error}</span>
    )}
  </label>
);

export default memo(FeedbackTextarea);
