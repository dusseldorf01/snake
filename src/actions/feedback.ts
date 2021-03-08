import { createAsyncActions } from '@/utils/redux/actions';
import type { IFeedback } from '@/models/feedback';

const feedbackActions = createAsyncActions<IFeedback>('FEEDBACK');

export default feedbackActions;
