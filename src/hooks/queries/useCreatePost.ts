import { useMutation } from '@tanstack/react-query';

import { UseMutationCustomOptions } from '@/types/api';
import { createPost } from '@/api/post';

const useCreatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
};

export default useCreatePost;
