import Error from '@/components/Error';
import cssCommon from '@/styles/common.css';

const Error500 = () => (
  <div className={cssCommon.centerContent}>
    <Error
      description="Мы уже фиксим"
      title="Ошибка 500"
    />
  </div>
);

export default Error500;
