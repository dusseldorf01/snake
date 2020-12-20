import { call, put } from 'redux-saga/effects';
import { AsyncActionCreator, AsyncRequestPayload } from '@/utils/redux/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiParams } from '@/utils/api';
import { AxiosInstance } from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function* loadData(
  creator: AsyncActionCreator,
  api: (params: ApiParams) => AxiosInstance,
  action: PayloadAction<AsyncRequestPayload>,
) {
  try {
    const response = yield call(api, action.payload.params);
    yield put(creator.success({ status: response.status, data: response.data }));
  } catch (error) {
    const { response } = error;
    yield put(creator.error({
      status: response!.status as number,
      data: response!.data || {},
      error: error.toString(),
    }));
  } finally {
    //
  }
}
