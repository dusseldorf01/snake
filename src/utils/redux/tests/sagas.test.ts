// import { createAsyncReducer, initialAsyncState } from '@/utils/redux/reducers';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { createAsyncActions } from '@/utils/redux/actions';
import createSagaMiddleware from 'redux-saga';
import { takeLatestRequest } from '@/utils/redux/sagas';
import { AxiosResponse } from 'axios';

const sleep = (ms:number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

describe('Test saga utils', () => {
  let store:Store;
  const sagaMiddleware = createSagaMiddleware();

  const type = 'SOME_FETCH';
  const apiSuccessResponse = {
    data: { id: 1 }, status: 200, statusText: 'success', headers: {}, config: {},
  };
  const apiFn = jest.fn(() => new Promise<AxiosResponse>((resolve) => {
    setTimeout(() => resolve(apiSuccessResponse));
  }));

  function initStore():Store {
    return configureStore({
      reducer: combineReducers({ data: (state = {}) => state }),
      middleware: [sagaMiddleware],
    });
  }

  beforeEach(() => {
    store = initStore();
  });

  it('should call api fn when request action dispatched', () => {
    const asyncActions = createAsyncActions(type);
    function* rootSaga() {
      yield takeLatestRequest(asyncActions, apiFn);
    }
    sagaMiddleware.run(rootSaga);
    store.dispatch(asyncActions.request());
    expect(apiFn.call.length).toEqual(1);
  });

  it('should call success action', async () => {
    const asyncActions = createAsyncActions(type);
    const spySuccess = jest.spyOn(asyncActions, 'success');

    function* rootSaga() {
      yield takeLatestRequest(asyncActions, apiFn);
    }
    sagaMiddleware.run(rootSaga);
    store.dispatch(asyncActions.request());
    await sleep(0);
    expect(spySuccess).toBeCalledWith({
      data: apiSuccessResponse.data,
      status: apiSuccessResponse.status,
    });
  });

  it('should call error action', async () => {
    const errorResponse = {
      response: {
        status: 500,
        data: { id: 1 },
      },
    };
    const apiFnError = jest.fn(() => new Promise<AxiosResponse>((_resolve, reject) => {
      setTimeout(() => reject(errorResponse));
    }));
    const asyncActions = createAsyncActions(type);
    const spyError = jest.spyOn(asyncActions, 'error');

    function* rootSaga() {
      yield takeLatestRequest(asyncActions, apiFnError);
    }
    sagaMiddleware.run(rootSaga);
    store.dispatch(asyncActions.request());
    await sleep(0);
    expect(spyError).toBeCalledWith({
      data: errorResponse.response.data,
      status: errorResponse.response.status,
      error: errorResponse.toString(),
    });
  });

  it('should cancel previous request', async () => {
    const asyncActions = createAsyncActions(type);
    const spySuccess = jest.spyOn(asyncActions, 'success');
    const mockApi = jest.fn();
    const secondData = { id: 2 };
    mockApi
      .mockImplementationOnce(() => new Promise<AxiosResponse>((resolve) => {
        setTimeout(() => resolve(apiSuccessResponse), 2);
      }))
      .mockImplementationOnce(() => new Promise<AxiosResponse>((resolve) => {
        setTimeout(() => resolve({ ...apiSuccessResponse, data: secondData }), 3);
      }));
    function* rootSaga() {
      yield takeLatestRequest(asyncActions, mockApi);
    }
    sagaMiddleware.run(rootSaga);
    store.dispatch(asyncActions.request());
    await sleep(0);
    store.dispatch(asyncActions.request());
    await sleep(4);

    expect(spySuccess.mock.calls.length).toBe(1);
    expect(spySuccess).toBeCalledWith({
      data: secondData,
      status: apiSuccessResponse.status,
    });

    mockApi.mockClear();
  });
});
