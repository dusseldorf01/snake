import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { AsyncActionCreator } from '@/utils/redux/actions';
import { ApiParams } from '@/utils/api';

export interface AsyncReducerState {
  loading: boolean,
  params?: ApiParams,
  data: {[key: string]: unknown},
  error: string,
  status?: number
}

export const initialAsyncState: AsyncReducerState = {
  loading: true, data: {}, error: '', status: 0, params: {},
};

export const initialAsyncStateNoLoad = { ...initialAsyncState, loading: false };

export const createAsyncReducer = (
  initialState = initialAsyncState,
  asyncCreator:AsyncActionCreator,
  configurator?:(builder: ActionReducerMapBuilder<AsyncReducerState>) => void,
) => createReducer(initialState, ((builder) => {
  builder
    .addCase(asyncCreator.request, (state, action) => ({
      ...state,
      params: (action.payload && action.payload.params) || {},
      loading: true,
      data: {},
    }))
    .addCase(asyncCreator.success, (state, action) => ({
      ...state,
      ...action.payload,
      error: '',
      loading: false,
    }))
    .addCase(asyncCreator.error, (state, action) => ({
      ...state,
      data: action.payload.data || {},
      error: action.payload.error,
      status: action.payload.status,
      loading: false,
    }));
  if (configurator) {
    configurator(builder);
  }
}));
