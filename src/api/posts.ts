import type { AxiosRequestConfig } from 'axios';
import apiInternal from '@/utils/apiInternal';
import queryStringify from '@/utils/api/queryStringify';
import type {
  ICommentAction,
  ICommentResponse,
  IPost,
  IPostPreview,
  IPostResponse,
} from '@/models/forum';

const path = 'posts';

export const getPosts = ({
  data,
}: AxiosRequestConfig = { data: '' }) => apiInternal.get<IPostPreview[]>(`${path}${queryStringify(data)}`);
export const getPost = ({
  data: { id },
}: AxiosRequestConfig) => apiInternal.get<IPost>(`${path}/${id}`);
export const createPost = ({
  data,
}: AxiosRequestConfig) => apiInternal.post<IPostResponse>(path, data);
export const addLike = (id: number) => apiInternal.post(`${path}/${id}/like`);
export const deleteLike = (id: number) => apiInternal.delete(`${path}/${id}/like`);
export const addComment = ({
  parentId,
  postId,
  text,
}: ICommentAction) => apiInternal.post<ICommentResponse>(`${path}/${postId}/comments`, { parentId, text });
