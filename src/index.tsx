import './serviceWorkers/init';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import rootReducer from './reducers';
import rootSaga from './saga';
import './styles/variables.css';
import './styles/index.css';

// fetch('https://ya-praktikum.tech/api/v2/auth/user', { credentials: 'same-origin' });
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app'),
);
