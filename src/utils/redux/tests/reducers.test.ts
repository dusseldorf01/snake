import { createAsyncReducer, getInitialAsyncState } from '@/utils/redux/reducers';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAsyncActions } from '@/utils/redux/actions';

describe('createAsyncReducer', () => {
  const type = 'SOME_FETCH';
  const asyncActions = createAsyncActions(type);
  const asyncReducer = createAsyncReducer(getInitialAsyncState({}), asyncActions);
  const store = configureStore({ reducer: combineReducers({ asyncReducer }) });

  it('should has right initial state', () => {
    expect(store.getState().asyncReducer).toEqual(getInitialAsyncState({}));
  });

  it('should set right state on request', () => {
    const expectedState = { ...getInitialAsyncState({}), loading: true, params: { data: '123' } };
    store.dispatch(asyncActions.request({ params: expectedState.params }));
    expect(store.getState().asyncReducer).toEqual(expectedState);
  });

  it('should set right state on success', () => {
    const expectedState = {
      ...getInitialAsyncState({}),
      loading: false,
      params: { data: '123' },
      data: { some: 123 },
      status: 200,
    };
    store.dispatch(asyncActions.success({
      status: expectedState.status,
      data: expectedState.data,
    }));
    expect(store.getState().asyncReducer).toEqual(expectedState);
  });

  it('should set right state on error', () => {
    const expectedState = {
      ...getInitialAsyncState({}),
      loading: false,
      params: { data: '123' },
      data: { some: 123 },
      status: 404,
      error: 'Network error',
    };
    store.dispatch(asyncActions.error({
      status: expectedState.status,
      data: expectedState.data,
      error: expectedState.error,
    }));
    expect(store.getState().asyncReducer).toEqual(expectedState);
  });

  it('should set right state on clear', () => {
    store.dispatch(asyncActions.clear());
    expect(store.getState().asyncReducer).toEqual(getInitialAsyncState({}));
  });
});
