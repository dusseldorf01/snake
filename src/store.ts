import {
  configureStore,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit';
import rootReducer, { RootState } from '@/reducers';
import {
  createBrowserHistory,
  createMemoryHistory,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'history';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { SagaMiddleware } from '@redux-saga/core';
import { routerMiddleware } from 'connected-react-router';

interface ICreateStore {
  sagaMiddleware: SagaMiddleware;
  client?: boolean;
  initialState?: object;
  url?: string;
}

const createStore = ({
  client = true,
  initialState,
  sagaMiddleware,
  url = '/',
}: ICreateStore) => {
  const history = IS_SERVER ? (
    createMemoryHistory({
      initialEntries: [url],
    })
  ) : (
    createBrowserHistory()
  );

  let options: ConfigureStoreOptions<any, any, any> = {
    reducer: rootReducer(history),
    middleware: [sagaMiddleware, routerMiddleware(history)],
  };

  if (client) {
    options = {
      ...options,
      // eslint-disable-next-line no-underscore-dangle
      preloadedState: !IS_SERVER ? (window as any).__PRELOADED_STATE__ : undefined,
      devTools: process.env.NODE_ENV !== 'production',
    };
  }

  if (initialState) {
    options = {
      ...options,
      preloadedState: initialState,
    };
  }

  const store = configureStore<RootState>(options);

  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const newRootReducer = require('./reducers').default;
      store.replaceReducer(newRootReducer);
    });
  }

  return { store, history };
};

export default createStore;
