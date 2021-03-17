import userThemeActions from '@/actions/userTheme';
import {
  createAsyncReducer,
  getInitialAsyncStateNoLoad,
} from '@/utils/redux/reducers';
import {
  IUserTheme,
  Theme,
} from '@/models/theme';

const userTheme = createAsyncReducer<IUserTheme>(
  getInitialAsyncStateNoLoad({ themeName: Theme.LIGHT } as IUserTheme),
  userThemeActions,
);

export default userTheme;
