import { UserTheme } from '@/server/models';
import type { IChangeUserTheme } from '@/models/theme';

export const getByUserId = (userId: number) => (
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

export const update = ({ userId, themeName }: IChangeUserTheme) => (
  UserTheme
    .update({ userId, themeName }, {
      where: {
        userId,
      },
    })
);
