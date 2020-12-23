import { SyntheticEvent } from 'react';

export interface IFeedbackTextareaProps {
  label: string;
  value: string;
  name: string;
  onBlur: (e: SyntheticEvent) => void;
  onChange: (e: SyntheticEvent) => void;
}
