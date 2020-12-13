import { FunctionComponent } from 'react';
import './index.css';

const Loader: FunctionComponent<{}> = () => {
  const circles: JSX.Element[] = [];

  for (let i = 0; i < 12; i += 1) {
    circles.push(
      <div
        key={i}
        className="loader__circle"
      />,
    );
  }

  return (
    <div className="loader">
      {circles.map((circle) => (
        circle
      ))}
    </div>
  );
};

export default Loader;
