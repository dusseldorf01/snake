import type {
  Request,
  Response,
} from 'express';
import {
  create as createTheme,
  getAll as getAllThemes,
  getById as getThemeById,
  remove as removeTheme,
  update as updateTheme,
} from '@/server/services/ThemesService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import getPaginationParams from '@/utils/api/getPaginationParams';
import { IThemeCreate } from '@/models/theme';

export const create = (
  req: Request<any, any, IThemeCreate>,
  res: Response,
) => {
  const {
    description,
    name,
  } = req.body;

  if (!description || !name) {
    res.status(RESPONSE_CODE.BAD_REQUEST).send({
      message: responseErrorMessages.required<IThemeCreate>(['name', 'description']),
    });
    return;
  }

  // eslint-disable-next-line consistent-return
  return createTheme(({ description, name }))
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.create('theme'),
      });
    });
};

export const getAll = (
  req: Request,
  res: Response,
) => {
  const {
    limit,
    offset,
  } = getPaginationParams(req.query);

  return getAllThemes({ limit, offset })
    .then(({ count: total, rows: items }) => {
      res.send({ total, items });
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.getAll('themes'),
      });
    });
};

export const getById = (
  req: Request<{ themeId: number }>,
  res: Response,
) => {
  const { themeId } = req.params;

  return getThemeById(themeId)
    .then((theme) => {
      if (!theme) {
        res.status(RESPONSE_CODE.BAD_REQUEST).send({
          message: responseErrorMessages.notExist('theme', themeId),
        });
        return;
      }

      res.send(theme);
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.getById('theme', themeId),
      });
    });
};

export const update = (
  req: Request<{ themeId: number }, any, IThemeCreate>,
  res: Response,
) => {
  const { themeId } = req.params;

  const {
    description,
    name,
  } = req.body;

  if (!description || !name) {
    res.status(RESPONSE_CODE.BAD_REQUEST).send({
      message: responseErrorMessages.required<IThemeCreate>(['name', 'description']),
    });
    return;
  }

  // eslint-disable-next-line consistent-return
  return updateTheme(themeId, { description, name })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.update('theme', themeId),
      });
    });
};

export const remove = (
  req: Request<{ themeId: number }>,
  res: Response,
) => {
  const { themeId } = req.params;

  return removeTheme(themeId)
    .then((data) => {
      res.send({ count: data });
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.delete('theme', themeId),
      });
    });
};
