export interface IMenu {
  Switcher: () => JSX.Element;
}

export interface IMenuItem {
  title: string;
  path: string;
  exact?: boolean;
}
