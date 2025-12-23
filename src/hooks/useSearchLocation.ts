import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import Config from 'react-native-config';
import axios from 'axios';

import { RegionInfo, RegionResponse } from '@/types/region';

const useSearchLocation = (keyword: string, location: LatLng) => {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageParam, setPageParam] = useState(1);

  const fetchNextPage = () => setPageParam(prev => prev + 1);
  const fetchPrevPage = () => setPageParam(prev => prev - 1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&y=${location.latitude}&x=${location.longitude}&page=${pageParam}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );

        setHasNextPage(!data.meta.is_end);
        setRegionInfo(data.documents);
        setTotalCount(data.meta.total_count);
      } catch (error) {
        setRegionInfo([]);
        setTotalCount(0);
      }

      keyword === '' && setPageParam(1);
    })();
  }, [keyword, location, pageParam]);

  return {
    regionInfo,
    pageParam,
    fetchNextPage,
    fetchPrevPage,
    hasNextPage,
    totalCount,
  };
};

export default useSearchLocation;
