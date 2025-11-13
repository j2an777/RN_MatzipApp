import { useMutation } from '@tanstack/react-query';

import { UseMutationCustomOptions } from '@/types/api';
import { queryKeys } from '@/constants/keys';
import queryClient from '@/api/queryClient';
import { createPost } from '@/api/post';
// import { Marker } from '@/types/domain';

const useCreatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      // queryClient.setQueryData<Marker[]>(
      //   [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //   oldPosts => {
      //     const newData = {
      //       id: newPost.id,
      //       longitude: newPost.longitude,
      //       latitude: newPost.latitude,
      //       color: newPost.color,
      //       score: newPost.score,
      //     };

      //     return oldPosts ? [...oldPosts, newData] : [newData];
      //   },
      // );
    },
    ...mutationOptions,
  });
};

export default useCreatePost;
