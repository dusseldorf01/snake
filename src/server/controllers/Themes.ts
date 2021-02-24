import type {
  Request,
  Response,
} from 'express';
import ThemesService from '@/server/services/ThemesService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import getPaginationParams from '@/utils/api/getPaginationParams';
import { IThemeCreate } from '@/models/theme';

export default class Themes {
  public static create = (
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

    ThemesService
      .create(({ description, name }))
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.create('theme'),
        });
      });
  };

  public static getAll = (
    req: Request,
    res: Response,
  ) => {
    const {
      limit,
      offset,
    } = getPaginationParams(req.query);

    ThemesService
      .getAll({ limit, offset })
      .then(({ count: total, rows: items }) => {
        res.send({ total, items });
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.getAll('themes'),
        });
      });
  };

  public static getById = (
    req: Request<{ themeId: number }>,
    res: Response,
  ) => {
    const { themeId } = req.params;

    ThemesService
      .getById(themeId)
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

  public static update = (
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

    ThemesService
      .update(themeId, { description, name })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.update('theme', themeId),
        });
      });
  };

  public static delete = (
    req: Request<{ themeId: number }>,
    res: Response,
  ) => {
    const { themeId } = req.params;

    ThemesService
      .delete(themeId)
      .then((data) => {
        res.send({ count: data });
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.delete('theme', themeId),
        });
      });
  };
}
