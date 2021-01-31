import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { createAsyncActions } from '@/utils/redux/actions';
import createSagaMiddleware from 'redux-saga';
import { takeLatestRequest } from '@/utils/redux/sagas';
import { AxiosResponse } from 'axios';

describe('Test saga utils', () => {
  let store:Store;
  const sagaMiddleware = createSagaMiddleware();

  const type = 'SOME_FETCH';
  const apiSuccessResponse = {
    data: { id: 1 }, status: 200, statusText: 'success', headers: {}, config: {},
  };

  const makeApi = (response: AxiosResponse = apiSuccessResponse) => jest.fn(
    () => new Promise<AxiosResponse>((resolve) => {
      resolve(response);
    }),
  );

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
    const apiFn = makeApi();
    const asyncActions = createAsyncActions(type);
    function* rootSaga() {
      yield takeLatestRequest(asyncActions, apiFn);
    }
    sagaMiddleware.run(rootSaga);
    store.dispatch(asyncActions.request());
    expect(apiFn.call.length).toEqual(1);
  });

  it('should call success action', async () => {
    const apiFn = makeApi();
    const asyncActions = createAsyncActions(type);
    const spySuccess = jest.spyOn(asyncActions, 'success');

    function* rootSaga() {
      yield takeLatestRequest(asyncActions, apiFn);
    }
    sagaMiddleware.run(rootSaga);
    store.dispatch(asyncActions.request());
    await apiFn.mock.results[0].value;
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
    await apiFnError.mock.results[0].value.catch(() => undefined);
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
        resolve(apiSuccessResponse);
      }))
      .mockImplementationOnce(() => new Promise<AxiosResponse>((resolve) => {
        resolve({ ...apiSuccessResponse, data: secondData });
      }));
    function* rootSaga() {
      yield takeLatestRequest(asyncActions, mockApi);
    }
    sagaMiddleware.run(rootSaga);
    store.dispatch(asyncActions.request());
    store.dispatch(asyncActions.request());
    await mockApi.mock.results[1].value;
    expect(spySuccess.mock.calls.length).toBe(1);
    expect(spySuccess).toBeCalledWith({
      data: secondData,
      status: apiSuccessResponse.status,
    });

    mockApi.mockClear();
  });
});
