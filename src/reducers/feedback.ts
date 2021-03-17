import feedbackActions from '@/actions/feedback';
import {
  createAsyncReducer,
  getInitialAsyncStateNoLoad,
} from '@/utils/redux/reducers';
import {
  IFeedback,
  feedbackInitialModel,
} from '@/models/feedback';

const feedback = createAsyncReducer<IFeedback>(
  getInitialAsyncStateNoLoad(feedbackInitialModel as IFeedback),
  feedbackActions,
);

export default feedback;
