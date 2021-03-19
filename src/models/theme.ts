export enum Theme {
  'LIGHT' = 'light',
  'DARK' = 'dark',
}

export interface IChangeUserThemeBody {
  themeName: string;
}

export interface IChangeUserTheme extends IChangeUserThemeBody {
  userId: number;
}

export interface IUserTheme {
  id: number;
  themeName: string;
  userId: number;
}

export interface IThemeCreate {
  name: string;
  description: string;
}

export interface ITheme extends IThemeCreate {
  id: number;
}
