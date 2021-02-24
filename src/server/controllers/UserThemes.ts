import type {
  Request,
  Response,
} from 'express';
import UserThemesService from '@/server/services/UserThemesService';
import RESPONSE_CODE from '@/server/responseCode';
import responseErrorMessages from '@/utils/api/responseMessages';
import type { IChangeUserThemeBody } from '@/models/theme';

export default class UserThemes {
  public static get = (req: Request, res: Response) => {
    const { user } = req;

    if (user === undefined) {
      res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
        message: responseErrorMessages.userNotFound(),
      });
      return;
    }

    const { id: userId } = user;

    UserThemesService
      .get(userId)
      .then((data) => {
        res.send(data[0]);
      }).catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.getAll('user theme'),
        });
      });
  };

  public static update = (req: Request<any, any, IChangeUserThemeBody>, res: Response) => {
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

    UserThemesService
      .update({ userId, themeName })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(RESPONSE_CODE.INTERNAL_ERROR).send({
          message: error.message || responseErrorMessages.update('theme for user', userId),
        });
      });
  };
}
