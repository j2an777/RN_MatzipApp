import { LatLng, MapMarkerProps } from 'react-native-maps';

declare module 'react-native-maps' {
  export interface MyMapsMakerProps extends MapMarkerProps {
    coordinate?: LatLng;
  }
}
