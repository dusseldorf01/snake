import { useCallback } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import userThemeActions from '@/actions/userTheme';
import userThemeSelector from '@/selectors/userTheme';
import { Theme } from '@/models/theme';
import cssCommon from '@/styles/common.css';
import css from './index.css';

const ThemeSwitcher = () => {
  const { themeName } = useSelector(userThemeSelector);

  const dispatch = useDispatch();

  const toggleTheme = useCallback(() => {
    dispatch(userThemeActions.updateRequest());
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={css.themeSwitcher}>
      <input
        checked={themeName === Theme.DARK}
        className={css.themeSwitcherInput}
        name="theme-switcher"
        onChange={toggleTheme}
        type="checkbox"
      />
      <span className={css.themeSwitcherBounce} />
      <span className={cssCommon.visuallyHidden}>Переключить тему</span>
    </label>
  );
};

export default ThemeSwitcher;
