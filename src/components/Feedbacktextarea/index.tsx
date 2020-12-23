import { PureComponent } from 'react';
import { IFeedbackTextareaProps } from './interfaces';
import './index.css';

export default class FeedbackTextarea extends PureComponent <IFeedbackTextareaProps, {}> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props:IFeedbackTextareaProps) {
    super(props);
  }

  render() {
    const {
      label,
      name,
      onChange,
      onBlur,
      value,
    } = this.props;

    return (
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
      </label>
    );
  }
}
