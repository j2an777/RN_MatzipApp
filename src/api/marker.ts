import { Marker } from '@/types/domain';

import instance from '.';

const getMarkers = async (): Promise<Marker[]> => {
  const { data } = await instance.get('/markers');

  return data;
};

export { getMarkers };
