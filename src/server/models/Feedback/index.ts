import {
  model,
  Schema,
} from 'mongoose';
import type { IFeedback } from './interfaces';

const FeedbackSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

const Feedback = model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
