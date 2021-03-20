import { ConnectedRouter } from 'connected-react-router';
import App from '@/components/App';
import { Provider } from 'react-redux';
import createStore from '@/store';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@/saga';

const sagaMiddleware = createSagaMiddleware();

const { store, history } = createStore({ sagaMiddleware });

sagaMiddleware.run(rootSaga);

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default Root;
