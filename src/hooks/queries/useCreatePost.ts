import { useMutation } from '@tanstack/react-query';

import { UseMutationCustomOptions } from '@/types/api';
import { queryKeys } from '@/constants/keys';
import queryClient from '@/api/queryClient';
import { createPost } from '@/api/post';

const useCreatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
};

export default useCreatePost;
