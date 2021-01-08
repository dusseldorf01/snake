import type { ReactNode } from 'react';

export interface IGameModal {
  buttonLabel: string;
  onClick: () => void;
  title: string;
  children?: ReactNode;
}
