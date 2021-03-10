import type {
  Request,
  Response,
} from 'express';
import {
  getByUserId as getThemeByUserId,
  update as updateTheme,
} from '@/server/services/UserThemesService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import type { IChangeUserThemeBody } from '@/models/theme';

export const getByUserId = (req: Request, res: Response) => {
  const { user } = req;

  if (user === undefined) {
    res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
      message: responseErrorMessages.userNotFound(),
    });
    return;
  }

  const { id: userId } = user;

  // eslint-disable-next-line consistent-return
  return getThemeByUserId(userId)
    .then((data) => {
      res.send(data[0]);
    }).catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.getAll('user theme'),
      });
    });
};

export const update = (req: Request<any, any, IChangeUserThemeBody>, res: Response) => {
  const { themeName } = req.body;

  const { user } = req;

  if (user === undefined) {
    res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
      message: responseErrorMessages.userNotFound(),
    });
    return;
  }

  const { id: userId } = user;

  if (!themeName) {
    res.status(RESPONSE_CODE.BAD_REQUEST).send({
      message: responseErrorMessages.required<IChangeUserThemeBody>(['themeName']),
    });
    return;
  }

  // eslint-disable-next-line consistent-return
  return updateTheme({ userId, themeName })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: error.message || responseErrorMessages.update('theme for user', userId),
      });
    });
};
