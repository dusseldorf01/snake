import { FunctionComponent } from 'react';
import './index.css';

const circles: JSX.Element[] = [];

for (let i = 0; i < 12; i += 1) {
  circles.push(
    <div
      key={i}
      className="loader__circle"
    />,
  );
}

const Loader: FunctionComponent<{}> = () => (
  <div className="loader">
    {circles}
  </div>
);

export default Loader;
