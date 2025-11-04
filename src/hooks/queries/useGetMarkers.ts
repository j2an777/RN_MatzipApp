import { useQuery } from '@tanstack/react-query';

import { UseQueryCustomOptions } from '@/types/api';
import { queryKeys } from '@/constants/keys';
import { getMarkers } from '@/api/marker';
import { Marker } from '@/types/domain';

const useGetMarkers = (queryOptions?: UseQueryCustomOptions<Marker[]>) => {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
};

export default useGetMarkers;
