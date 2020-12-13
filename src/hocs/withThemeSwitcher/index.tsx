import {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import './index.css';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

const withThemeSwitcher = (Component: FunctionComponent<any>) => (props: any) => {
  const [theme, setTheme] = useState<Themes>(Themes.LIGHT);
  const toggleTheme = () => setTheme((t) => (t === Themes.LIGHT ? Themes.DARK : Themes.LIGHT));
  useEffect(() => {
    const html = document.querySelector('html');

    if (theme === Themes.DARK) {
      html?.classList.add('dark');
      html?.classList.remove('light');
    } else {
      html?.classList.add('light');
      html?.classList.remove('dark');
    }
  }, [theme]);

  const Switcher: FunctionComponent<{}> = useCallback(() => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="theme-switcher">
      <input
        className="theme-switcher__input"
        name="theme-switcher"
        onChange={toggleTheme}
        type="checkbox"
      />
      <span className="theme-switcher__bounce" />
      <span className="visually-hidden">Переключить тему</span>
    </label>
  ), []);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} Switcher={Switcher} />
  );
};

export default withThemeSwitcher;
