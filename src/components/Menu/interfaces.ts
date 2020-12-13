import { FunctionComponent } from 'react';

export interface IMenu {
  Switcher: FunctionComponent<{}>;
}

export interface IMenuItem {
  title: string;
  path: string;
}
