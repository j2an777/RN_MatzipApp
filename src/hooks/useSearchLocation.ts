import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import Config from 'react-native-config';
import axios from 'axios';

import { RegionInfo, RegionResponse } from '@/types/region';

const useSearchLocation = (keyword: string, location: LatLng) => {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&y=${location.latitude}&x=${location.longitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );

        setRegionInfo(data.documents);
      } catch (error) {
        setRegionInfo([]);
      }
    })();
  }, [keyword, location]);

  return regionInfo;
};

export default useSearchLocation;
