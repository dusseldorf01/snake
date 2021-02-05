import './serviceWorkers/init';
import ReactDOM from 'react-dom';
import Root from '@/components/Root';
import './styles/variables.css';
import './styles/index.css';

ReactDOM.render(
  <Root />,
  document.querySelector('#app'),
);
