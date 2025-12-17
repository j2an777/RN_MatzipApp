import MapView, { LatLng, Region } from 'react-native-maps';
import { useEffect, useRef, useState } from 'react';

import { numbers } from '@/constants/numbers';
import useLocationStore from '@/store/location';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

const useMoveMapView = () => {
  const [regionDelta, setRegionDetla] = useState<Delta>(numbers.INITIAL_DELTA);

  const { moveLocation } = useLocationStore();
  const mapRef = useRef<MapView | null>(null);

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...(delta ?? regionDelta),
    });
  };

  const handleChangeDelta = (region: Region) => {
    const { latitudeDelta, longitudeDelta } = region;
    setRegionDetla({ latitudeDelta, longitudeDelta });
  };

  useEffect(() => {
    if (moveLocation) moveMapView(moveLocation);
  }, [moveLocation]);

  return { moveMapView, handleChangeDelta, mapRef };
};

export default useMoveMapView;
