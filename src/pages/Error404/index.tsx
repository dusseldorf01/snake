import { FunctionComponent } from 'react';
import Error from '@/components/Error';

const Error404: FunctionComponent<{}> = () => (
  <div className="center-content">
    <Error
      description="Такая страница не найдена"
      title="Ошибка 404"
    />
  </div>
);

export default Error404;
