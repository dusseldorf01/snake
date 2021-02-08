import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/reducers';
import rootSaga from '@/saga';

declare const IS_SERVER: boolean;

export const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  // eslint-disable-next-line no-underscore-dangle
  preloadedState: !IS_SERVER ? (window as any).__PRELOADED_STATE__ : undefined,
  devTools: process.env.NODE_ENV !== 'production',
});
export const sagaResult = sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('./reducers').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
