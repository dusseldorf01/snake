import { Provider } from 'react-redux';
import createStore from '@/store';
import createSagaMiddleware from 'redux-saga';

export interface IReduxTestWrapper {
  children: JSX.Element;
  initialState?: Record<string, any>;
}

const sagaMiddleware = createSagaMiddleware();

const ReduxTestWrapper = ({
  children,
  initialState = {},
}: IReduxTestWrapper) => {
  const { store } = createStore({
    initialState,
    sagaMiddleware,
  });

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxTestWrapper;
