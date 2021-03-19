import type { ReactNode } from 'react';

export interface IPaginationButton {
  active: boolean;
  item: number;
  label: string;
  children?: ReactNode;
}
