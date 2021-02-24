import {
  ActionCreatorWithoutPayload,
  createAction,
} from '@reduxjs/toolkit';
import {
  AsyncActionCreator,
  createAsyncActions,
} from '@/utils/redux/actions';
import type { IUserTheme } from '@/models/theme';

type UserThemeActionsType = {
  updateRequest: ActionCreatorWithoutPayload,
  updateSuccess: ActionCreatorWithoutPayload,
  updateError: ActionCreatorWithoutPayload,
} & AsyncActionCreator<IUserTheme>;

const type = 'USER_THEME';

const userThemeActions: UserThemeActionsType = {
  ...createAsyncActions<IUserTheme>(type),
  updateRequest: createAction(`${type}_UPDATE_REQUEST`),
  updateSuccess: createAction(`${type}_UPDATE_SUCCESS`),
  updateError: createAction(`${type}_UPDATE_ERROR`),
};

export default userThemeActions;
