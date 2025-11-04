import { Post } from '@/types/domain';

import instance from '.';

type CreatePost = Omit<Post, 'id'>;

const createPost = async (body: CreatePost): Promise<Post> => {
  const { data } = await instance.post('/posts', body);

  return data;
};

export { createPost };
