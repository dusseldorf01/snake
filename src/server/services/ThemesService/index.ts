import { Theme } from '@/server/models';
import type { GetAllQueryType } from '@/server/services/types';
import type { IThemeCreate } from '@/models/theme';

export const create = (body: IThemeCreate) => (
  Theme.create(body)
);

export const getAll = ({
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

export const getById = (id: number) => (
  Theme.findByPk(id)
);

export const update = (id: number, body: IThemeCreate) => (
  Theme.update(body, {
    where: {
      id,
    },
  })
);

export const remove = (id: number) => (
  Theme.destroy({
    where: {
      id,
    },
  })
);
