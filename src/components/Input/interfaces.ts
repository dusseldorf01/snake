import { SyntheticEvent } from 'react';

export interface IFormInput {
  name: string;
  onBlur: (e: SyntheticEvent) => void;
  onChange: (e: SyntheticEvent) => void;
  label?: string;
  value?: string;
  error?: string | false;
  type?: 'email' | 'tel' | 'text' | 'password' | 'file';
  inputFile?: (elm:HTMLInputElement) => HTMLInputElement;
  avatarImage?: string | unknown;
  errorOnChangeAvatar?: string
}
