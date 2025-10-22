import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useState } from 'react';

import useUserLocation from '@/hooks/useUserLocation';
import DrawerButton from '@/components/DrawerButton';
import CustomMarker from '@/components/CustomMarker';
import useMoveMapView from '@/hooks/useMoveMapView';
import usePermission from '@/hooks/usePermission';
import { numbers } from '@/constants/numbers';
import { colors } from '@/constants/colors';

const MapHomeScreen = () => {
  const { userLocation, isUserLocationError } = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const { moveMapView, handleChangeDelta, mapRef } = useMoveMapView();

  const inset = useSafeAreaInsets();
  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };

  const handlePressMarker = (coordinate: LatLng) => moveMapView(coordinate);

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, { top: inset.top + 10 }]}
        color={colors.WHITE}
      />
      <MapView
        googleMapId="792e4dcbf17857a42e139851"
        style={styles.container}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={handleChangeDelta}
        onLongPress={({ nativeEvent }) =>
          setSelectLocation(nativeEvent.coordinate)
        }
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}>
        {[
          {
            id: 1,
            color: colors.PINK_400,
            score: 4,
            coordinate: {
              latitude: 37.5536032365118,
              longitude: 126.98189626020192,
            },
          },
          {
            id: 2,
            color: colors.PINK_400,
            score: 3,
            coordinate: {
              latitude: 37.5526032365118,
              longitude: 126.98919626020192,
            },
          },
        ].map(marker => (
          <CustomMarker
            key={marker.id}
            color={marker.color}
            score={marker.score}
            coordinate={marker.coordinate}
            onPress={() => handlePressMarker(marker.coordinate)}
          />
        ))}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <FontAwesome6
            iconStyle="solid"
            size={25}
            color={colors.WHITE}
            name="location-crosshairs"
          />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
});

export default MapHomeScreen;
