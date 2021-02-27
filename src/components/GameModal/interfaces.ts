import type { ReactNode } from 'react';

interface IGameModalButton {
  label: string;
  onClick: () => void;
}

export interface IGameModal {
  buttons: IGameModalButton[];
  title: string;
  children?: ReactNode;
}
