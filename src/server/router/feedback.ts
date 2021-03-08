import Feedback from '@/server/controllers/Feedback';
import type { IRoute } from '@/utils/api/getRoutes';

const feedbackRoutes: IRoute[] = [{
  handler: Feedback.getAll,
  method: 'get',
  path: '/feedback',
}, {
  handler: Feedback.create,
  method: 'post',
  path: '/feedback',
}];

export default feedbackRoutes;
