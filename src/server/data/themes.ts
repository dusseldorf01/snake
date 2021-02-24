import { IThemeCreate } from '@/models/theme';

const defaultThemes: IThemeCreate[] = [{
  name: 'light',
  description: 'Светлая тема',
}, {
  name: 'dark',
  description: 'Темная тема',
}];

export default defaultThemes;
