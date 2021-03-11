import type { RootState } from '@/reducers';
import type { IFeedback } from '@/models/feedback';
import type { AsyncReducerState } from '@/utils/redux/reducers';

const feedbackSelector = (state: RootState): AsyncReducerState<IFeedback> => state.feedback;

export default feedbackSelector;
