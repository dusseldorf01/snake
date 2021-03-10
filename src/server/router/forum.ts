import {
  create as createPost,
  getAll as getAllPosts,
  getById as getPostById,
} from '@/server/controllers/Posts';
import { create as createComment } from '@/server/controllers/Comments';
import {
  add as addLike,
  remove as removeLike,
} from '@/server/controllers/Likes';
import type { IRoute } from '@/utils/api/getRoutes';

const forumRoutes: IRoute[] = [{
  handler: getAllPosts,
  method: 'get',
  path: '/posts',
}, {
  handler: getPostById,
  method: 'get',
  path: '/posts/:id',
}, {
  handler: createPost,
  method: 'post',
  path: '/posts',
}, {
  handler: createComment,
  method: 'post',
  path: '/posts/:postId/comments',
}, {
  handler: addLike,
  method: 'post',
  path: '/posts/:postId/like',
}, {
  handler: removeLike,
  method: 'delete',
  path: '/posts/:postId/like',
}];

export default forumRoutes;
