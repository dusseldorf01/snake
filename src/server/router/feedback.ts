import {
  create as createFeedback,
  getAll as getAllFeedback,
} from '@/server/controllers/Feedback';
import type { IRoute } from '@/utils/api/getRoutes';

const feedbackRoutes: IRoute[] = [{
  handler: getAllFeedback,
  method: 'get',
  path: '/feedback',
}, {
  handler: createFeedback,
  method: 'post',
  path: '/feedback',
}];

export default feedbackRoutes;
