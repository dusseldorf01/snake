import type { RootState } from '@/reducers';
import type { IUserTheme } from '@/models/theme';

const userThemeSelector = (state: RootState): IUserTheme => state.userTheme.data;

export default userThemeSelector;
