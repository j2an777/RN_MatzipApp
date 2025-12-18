import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseMutationCustomOptions } from '@/types/api';
import { queryKeys } from '@/constants/keys';
import { deletePost } from '@/api/post';
import { Marker } from '@/types/domain';

const useDeletePost = (mutationOptions?: UseMutationCustomOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        prev => prev?.filter(marker => marker.id !== deleteId),
      );
    },
    ...mutationOptions,
  });
};

export default useDeletePost;
