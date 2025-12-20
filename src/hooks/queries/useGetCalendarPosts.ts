import { useQuery } from '@tanstack/react-query';

import { ResponseCalendarPost } from '@/types/calendar';
import { UseQueryCustomOptions } from '@/types/api';
import { getCalendarPosts } from '@/api/post';
import { queryKeys } from '@/constants/keys';

const useGetCalendarPosts = (
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) => {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [
      queryKeys.POST,
      queryKeys.GET_POSTS,
      queryKeys.GET_CALENDAR_POSTS,
      year,
      month,
    ],
    ...queryOptions,
  });
};

export default useGetCalendarPosts;
