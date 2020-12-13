import { SyntheticEvent } from 'react';

export interface IRegistrationInput {
  label: string;
  name: string;
  onBlur: (e: SyntheticEvent) => void;
  onChange: (e: SyntheticEvent) => void;
  value: string;
  error?: string | boolean;
  type?: 'email' | 'tel' | 'text';
}
