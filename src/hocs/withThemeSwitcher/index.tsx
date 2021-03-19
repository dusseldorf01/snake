import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import cssRoot from '@/styles/variables.css';
import cssCommon from '@/styles/common.css';
import css from './index.css';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface withInjectedSwitcherElement {
  Switcher: () => JSX.Element;
  [key:string]:any;
}

// eslint-disable-next-line max-len
const withThemeSwitcher = (Component: React.ComponentType<withInjectedSwitcherElement>): React.FC => (props) => {
  const mounted = useRef<boolean>(false);

  const [theme, setTheme] = useState<Themes>(Themes.LIGHT);
  // eslint-disable-next-line max-len
  const toggleTheme = useCallback(() => setTheme((t) => (t === Themes.LIGHT ? Themes.DARK : Themes.LIGHT)), []);

  useEffect(() => {
    if (!mounted.current) {
      return;
    }

    const html = document.querySelector('html');

    if (theme === Themes.DARK) {
      html?.classList.add(cssRoot.dark);
      html?.classList.remove(cssRoot.light);
    } else {
      html?.classList.add(cssRoot.light);
      html?.classList.remove(cssRoot.dark);
    }
  }, [theme]);
  useEffect(() => {
    mounted.current = true;
  }, []);

  const Switcher = useCallback(() => (
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
