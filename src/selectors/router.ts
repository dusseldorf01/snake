import type { RootState } from '@/reducers';

const routerSelector = (state: RootState) => state.router;

export default routerSelector;
