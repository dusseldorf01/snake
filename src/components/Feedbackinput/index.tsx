import { PureComponent } from 'react';
import { IFeedbackInputProps } from './interfaces';
import './index.css';

export default class FeedbackInput extends PureComponent <IFeedbackInputProps, {}> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props:IFeedbackInputProps) {
    super(props);
  }

  render() {
    const {
      error,
      label,
      name,
      onBlur,
      onChange,
      type = 'text',
      value,
      pattern,
    } = this.props;

    return (
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
  }
}
