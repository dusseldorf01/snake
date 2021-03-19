import { useSelector } from 'react-redux';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import type { RootState } from '@/reducers';
import type { AsyncReducerState } from '@/utils/redux/reducers';
import cssCommon from '@/styles/common.css';

function withDataLoader(
  selector: (state: RootState) => AsyncReducerState<any>,
) {
  return (Component: () => JSX.Element) => () => {
    const {
      loading,
      error,
    } = useSelector(selector);

    if (loading) {
      return (
        <div className={cssCommon.centerContent}>
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <Error description="При загрузке данных произошла ошибка" />
      );
    }

    return (
      <Component />
    );
  };
}

export default withDataLoader;
