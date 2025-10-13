import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';

const useUserLocation = () => {
  const [isUserLocationError, setIsUserLocationError] =
    useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setUserLocation(info.coords);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return { userLocation, isUserLocationError };
};

export default useUserLocation;
