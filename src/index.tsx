import './serviceWorkers/init';
import { loadableReady } from '@loadable/component';
import ReactDOM from 'react-dom';
import Root from '@/components/Root';
import './styles/variables.css';
import './styles/index.css';

declare const IS_SERVER: boolean;

loadableReady(() => {
  ReactDOM.hydrate(
    <Root />,
    document.querySelector('#root'),
  );
});

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/Root').default;
    ReactDOM.render(<NextApp />, document.querySelector('#root'));
  });
}

if (!IS_SERVER) {
  const stateNode = document.getElementById('preloadedState');
  if (stateNode) {
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__PRELOADED_STATE__ = undefined;
    stateNode.remove();
  }
}
