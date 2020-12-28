import {
  SyntheticEvent,
} from 'react';

export interface IAvatrProps {
  name: string;
  onChange: (e: SyntheticEvent) => void;
  value?: string;
  error?: string | boolean;
  inputFile?: (elm:HTMLInputElement) => HTMLInputElement;
}
