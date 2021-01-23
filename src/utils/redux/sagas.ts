import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import { AsyncActionCreator, AsyncRequestPayload } from '@/utils/redux/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiParams } from '@/utils/api';
import { AxiosResponse } from 'axios';

type ApiFn = (params: ApiParams) => Promise<AxiosResponse>;

// eslint-disable-next-line import/prefer-default-export
export function* loadData(
  creator: AsyncActionCreator,
  api: ApiFn,
  action: PayloadAction<AsyncRequestPayload>,
) {
  try {
    const response = yield call(api, action.payload?.params);
    yield put(creator.success({ status: response.status, data: response.data }));
  } catch (error) {
    const { response } = error;
    yield put(creator.error({
      status: response?.status,
      data: response?.data || {},
      error: error.toString(),
    }));
  } finally {
    //
  }
}

export const takeLatestRequest = (type: AsyncActionCreator, api: ApiFn) => fork(function* load() {
  let lastTask;
  while (true) {
    const action = yield take(type.request.toString());
    if (lastTask) {
      yield cancel(lastTask);
    }

    lastTask = yield fork(loadData, type, api, action);
  }
});

export const takeEveryRequest = (type: AsyncActionCreator, api: ApiFn) => fork(function* load() {
  while (true) {
    const action = yield take(type.request.toString());

    yield fork(loadData, type, api, action);
  }
});
