import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import { AsyncActionCreator, AsyncRequestPayload } from '@/utils/redux/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiParams } from '@/utils/api';
import { AxiosResponse } from 'axios';
import notification from '@/components/Notification';

type Notifications = {
  error?: string;
  success?: string;
};

type ApiFn = (params: ApiParams) => Promise<AxiosResponse>;

// eslint-disable-next-line import/prefer-default-export
export function* loadData(
  creator: AsyncActionCreator,
  api: ApiFn,
  action: PayloadAction<AsyncRequestPayload>,
  notifications?: Notifications,
) {
  try {
    const response = yield call(api, action.payload?.params);
    yield put(creator.success({ status: response.status, data: response.data }));
    if (notifications?.success !== undefined) {
      notification.success({ message: notifications.success });
    }
  } catch (error) {
    const { response } = error;
    yield put(creator.error({
      status: response?.status,
      data: response?.data || {},
      error: error.toString(),
    }));
    if (notifications?.error !== undefined) {
      notification.error({ message: notifications.error });
    }
  } finally {
    //
  }
}

export const takeLatestRequest = (
  type: AsyncActionCreator,
  api: ApiFn,
  notifications?: Notifications,
) => fork(function* load() {
  let lastTask;
  while (true) {
    const action = yield take(type.request.toString());
    if (lastTask) {
      yield cancel(lastTask);
    }

    lastTask = yield fork(loadData, type, api, action, notifications);
  }
});

export const takeEveryRequest = (type: AsyncActionCreator, api: ApiFn) => fork(function* load() {
  while (true) {
    const action = yield take(type.request.toString());

    yield fork(loadData, type, api, action);
  }
});
