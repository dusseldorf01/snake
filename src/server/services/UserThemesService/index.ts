import { UserTheme } from '@/server/models';
import type { IChangeUserTheme } from '@/models/theme';

export default class UserThemesService {
  public static get = (userId: number) => (
    UserTheme
      .findOrCreate({
        where: {
          userId,
        },
        defaults: {
          themeName: 'light',
          userId,
        },
      })
  );

  public static update = ({ userId, themeName }: IChangeUserTheme) => (
    UserTheme
      .update({ userId, themeName }, {
        where: {
          userId,
        },
      })
  );
}
