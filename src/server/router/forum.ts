import Posts from '@/server/controllers/Posts';
import Comments from '@/server/controllers/Comments';
import Likes from '@/server/controllers/Likes';
import type { IRoute } from '@/utils/api/getRoutes';

const forumRoutes: IRoute[] = [{
  handler: Posts.getAll,
  method: 'get',
  path: '/posts',
}, {
  handler: Posts.getById,
  method: 'get',
  path: '/posts/:id',
}, {
  handler: Posts.create,
  method: 'post',
  path: '/posts',
}, {
  handler: Comments.create,
  method: 'post',
  path: '/posts/:postId/comments',
}, {
  handler: Likes.create,
  method: 'post',
  path: '/posts/:postId/like',
}, {
  handler: Likes.delete,
  method: 'delete',
  path: '/posts/:postId/like',
}];

export default forumRoutes;
