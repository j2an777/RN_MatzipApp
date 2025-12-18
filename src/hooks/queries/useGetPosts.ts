import { useQuery } from '@tanstack/react-query';

import { UseQueryCustomOptions } from '@/types/api';
import { queryKeys } from '@/constants/keys';
import { Post } from '@/types/domain';
import { getPost } from '@/api/post';

const useGetPost = (
  id?: number,
  queryOptions?: UseQueryCustomOptions<Post>,
) => {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: !!id,
    ...queryOptions,
  });
};

export default useGetPost;
