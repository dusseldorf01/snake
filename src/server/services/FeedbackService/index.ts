import Feedback from '@/server/models/Feedback';
import type { GetAllQueryType } from '@/server/services/types';
import type { IFeedbackCreate } from '@/server/models/Feedback/interfaces';

export default class FeedbackService {
  public static create = ({
    message,
    title,
    userId,
  }: IFeedbackCreate) => (
    Feedback.create({
      message,
      title,
      userId,
    })
  );

  public static getAll = ({
    limit,
    offset,
  }: GetAllQueryType) => (
    Feedback.find({}, {}, {
      limit,
      skip: offset,
    })
  );
}
