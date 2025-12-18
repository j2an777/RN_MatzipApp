import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseMutationCustomOptions } from '@/types/api';
import { updateFavoritePost } from '@/api/post';
import { queryKeys } from '@/constants/keys';

const useFavoritePost = (mutationOptions?: UseMutationCustomOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updatedId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS, updatedId],
      });
    },
    ...mutationOptions,
  });
};

export default useFavoritePost;
