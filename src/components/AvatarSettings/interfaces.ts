import {
  SyntheticEvent,
} from 'react';

export interface IAvatrProps {
  label: string;
  name: string;
  onChange: (e: SyntheticEvent) => void;
  inputFileID: string;
  value?: string;
  error?: string | boolean;
}
