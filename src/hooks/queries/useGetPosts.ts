import { useQuery } from '@tanstack/react-query';

import { UseQueryCustomOptions } from '@/types/api';
import { queryKeys } from '@/constants/keys';
import { getPost } from '@/api/post';

const useGetPost = (id: number, queryOptions?: UseQueryCustomOptions) => {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    ...queryOptions,
  });
};

export default useGetPost;
