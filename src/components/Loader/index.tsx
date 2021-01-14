import { FunctionComponent } from 'react';
import css from './index.css';

const circles: JSX.Element[] = [];

for (let i = 0; i < 12; i += 1) {
  circles.push(
    <div
      key={i}
      className={css.loaderCircle}
    />,
  );
}

const Loader: FunctionComponent<{}> = () => (
  <div className={css.loader}>
    {circles}
  </div>
);

export default Loader;
