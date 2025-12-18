import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseMutationCustomOptions } from '@/types/api';
import { queryKeys } from '@/constants/keys';
import { updatePost } from '@/api/post';
import { Post } from '@/types/domain';

const useUpdatePost = (mutationOptions?: UseMutationCustomOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (newPost: Post) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, newPost.id],
      });
    },
    ...mutationOptions,
  });
};

export default useUpdatePost;
