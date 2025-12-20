import { Post, RequestUpdatePost } from '@/types/domain';
import { ResponseCalendarPost } from '@/types/calendar';

import instance from '.';

type CreatePost = Omit<Post, 'id'>;

const createPost = async (body: CreatePost): Promise<Post> => {
  const { data } = await instance.post('/posts', body);

  return data;
};

const getPost = async (id: number): Promise<Post> => {
  const { data } = await instance.get(`/posts/${id}`);

  return data;
};

const getPosts = async (page: number): Promise<Post[]> => {
  const { data } = await instance.get(`/posts?page=${page}`);

  return data;
};

const deletePost = async (id: number) => {
  const { data } = await instance.delete(`/posts/${id}`);

  return data;
};

const updatePost = async ({ id, body }: RequestUpdatePost): Promise<Post> => {
  const { data } = await instance.patch(`/posts/${id}`, body);

  return data;
};

const getFavoritePosts = async (page = 1) => {
  const { data } = await instance.get(`/favorites?page=${page}`);

  return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
  const { data } = await instance.post(`/favorites/${id}`);

  return data;
};

const getCalendarPosts = async (
  year: number,
  month: number,
): Promise<ResponseCalendarPost> => {
  const { data } = await instance.get(`/posts?year=${year}&month=${month}`);

  return data;
};

export {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
  getFavoritePosts,
  updateFavoritePost,
  getCalendarPosts,
};
