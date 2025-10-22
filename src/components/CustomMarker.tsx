import { LatLng, MapMarkerProps, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';

interface CustomMarkerProps extends MapMarkerProps {
  coordinate: LatLng;
  color: string;
  score?: number;
}

const CustomMarker = ({
  coordinate,
  color,
  score = 5,
  ...props
}: CustomMarkerProps) => {
  return (
    <Marker coordinate={coordinate} {...props}>
      <View style={styles.container}>
        <View style={[styles.marker, { backgroundColor: color }]}>
          <View style={[styles.eye, styles.leftEye]} />
          <View style={[styles.eye, styles.rightEye]} />
          {score > 3 && <View style={[styles.mouth, styles.good]} />}
          {score === 3 && <View style={[styles.mouth, styles.soso]} />}
          {score < 3 && <View style={[styles.mouth, styles.bad]} />}
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    width: 27,
    height: 27,
    borderRadius: 27,
    borderColor: colors.BLACK,
    borderWidth: 1,
    borderBottomRightRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  eye: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    transform: [{ rotate: '45deg' }],
    width: 12,
    height: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.01)',
    borderBottomColor: 'rgba(255,255,255,0.01)',
  },
  good: {
    marginLeft: 5,
    marginTop: 5,
    borderLeftColor: 'rgba(255,255,255,0.01)',
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: 'rgba(255,255,255,0.01)',
  },
  soso: {
    width: 8,
    height: 8,
    borderLeftColor: colors.BLACK,
    borderLeftWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 0,
    marginLeft: 13,
    marginTop: 13,
    transform: [{ rotate: '45deg' }],
  },
});

export default CustomMarker;
