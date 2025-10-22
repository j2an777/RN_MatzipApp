import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import axios from 'axios';

const useGetAddress = (location: LatLng) => {
  const { latitude, longitude } = location;
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=AIzaSyA3qwsO_QcnAkU14ExCTw_Jd99gsZ2Q5o0&language=ko`,
        );

        const address =
          data.results.length > 0
            ? data.results[0].formatted_address
            : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        setResult('주소를 알 수 없습니다.');
      }
    })();
  }, [latitude, longitude]);

  return result;
};

export default useGetAddress;
