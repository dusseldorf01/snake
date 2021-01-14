import {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import cssRoot from '@/styles/variables.css';
import cssCommon from '@/styles/common.css';
import css from './index.css';

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
      html?.classList.add(cssRoot.dark);
      html?.classList.remove(cssRoot.light);
    } else {
      html?.classList.add(cssRoot.light);
      html?.classList.remove(cssRoot.dark);
    }
  }, [theme]);

  const Switcher: FunctionComponent<{}> = useCallback(() => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={css.themeSwitcher}>
      <input
        className={css.themeSwitcherInput}
        name="theme-switcher"
        onChange={toggleTheme}
        type="checkbox"
      />
      <span className={css.themeSwitcherBounce} />
      <span className={cssCommon.visuallyHidden}>Переключить тему</span>
    </label>
  ), []);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} Switcher={Switcher} />
  );
};

export default withThemeSwitcher;
