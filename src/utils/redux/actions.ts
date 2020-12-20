import { createAction, PayloadActionCreator, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { ApiParams } from '@/utils/api';

export type AsyncRequestPayload = {params: ApiParams};
export type AsyncSuccessPayload = {
  data: {[key:string]: unknown},
  status: number
};
export type AsyncErrorPayload = {
  data?: {[key:string]: unknown},
  status?: number,
  error: string
};

export type AsyncActionCreator = {
  request: PayloadActionCreator<AsyncRequestPayload>,
  success: PayloadActionCreator<AsyncSuccessPayload>,
  error: PayloadActionCreator<AsyncErrorPayload>,
  clear: ActionCreatorWithoutPayload,
};

// eslint-disable-next-line import/prefer-default-export
export const createAsyncActions = (type: string):AsyncActionCreator => ({
  request: createAction<AsyncRequestPayload>(`${type}_REQUEST`),
  success: createAction<AsyncSuccessPayload>(`${type}_SUCCESS`),
  error: createAction<AsyncErrorPayload>(`${type}_ERROR`),
  clear: createAction(`${type}_CLEAR`),
});
