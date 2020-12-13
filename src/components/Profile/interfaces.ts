import { ReactNode } from 'react';

export interface IProfile {
  children: ReactNode;
  displayName: string;
  title: string;
  avatar?: string;
}
