import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '@/reducers';

export interface IReduxTestWrapper {
  children: JSX.Element;
  initialState?: Record<string, any>;
}

const ReduxTestWrapper = ({
  children,
  initialState = {},
}: IReduxTestWrapper) => (
  <Provider store={createStore(rootReducer, initialState)}>
    {children}
  </Provider>
);

export default ReduxTestWrapper;
