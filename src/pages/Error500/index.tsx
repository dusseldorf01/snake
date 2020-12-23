import { FunctionComponent } from 'react';
import Error from '@/components/Error';

const Error500: FunctionComponent<{}> = () => (
  <div className="center-content">
    <Error
      description="Мы уже фиксим"
      title="Ошибка 500"
    />
  </div>
);

export default Error500;
