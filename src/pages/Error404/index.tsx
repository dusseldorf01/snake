import { FunctionComponent } from 'react';
import Error from '@/components/Error';

import cssCommon from '@/styles/common.css';

const Error404: FunctionComponent<{}> = () => (
  <div className={cssCommon.centerContent}>
    <Error
      description="Такая страница не найдена"
      title="Ошибка 404"
    />
  </div>
);

export default Error404;
