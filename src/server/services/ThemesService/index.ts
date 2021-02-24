import { Theme } from '@/server/models';
import type { GetAllQueryType } from '@/server/services/types';
import type { IThemeCreate } from '@/models/theme';

export default class ThemesService {
  public static create = (body: IThemeCreate) => (
    Theme.create(body)
  );

  public static getAll = ({
    limit,
    offset,
  }: GetAllQueryType) => (
    Theme
      .findAndCountAll({
        offset,
        limit,
        order: [['createdAt', 'DESC']],
      })
  );

  public static getById = (id: number) => (
    Theme.findByPk(id)
  );

  public static update = (id: number, body: IThemeCreate) => (
    Theme.update(body, {
      where: {
        id,
      },
    })
  );

  public static delete = (id: number) => (
    Theme.destroy({
      where: {
        id,
      },
    })
  );
}
