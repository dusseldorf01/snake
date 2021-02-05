import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/App';
import { Provider } from 'react-redux';
import store from '@/store';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default hot(Root);
