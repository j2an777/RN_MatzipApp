import MapView, { LatLng, Region } from 'react-native-maps';
import { useRef, useState } from 'react';

import { numbers } from '@/constants/numbers';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

const useMoveMapView = () => {
  const [regionDelta, setRegionDetla] = useState<Delta>(numbers.INITIAL_DELTA);
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

  return { moveMapView, handleChangeDelta, mapRef };
};

export default useMoveMapView;
