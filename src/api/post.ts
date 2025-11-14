import { Post } from '@/types/domain';

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

export { createPost, getPost, getPosts };
