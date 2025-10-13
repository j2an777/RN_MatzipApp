import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRef } from 'react';

import useUserLocation from '@/hooks/useUserLocation';
import DrawerButton from '@/components/DrawerButton';
import usePermission from '@/hooks/usePermission';
import { numbers } from '@/constants/numbers';
import { colors } from '@/constants/colors';

const MapHomeScreen = () => {
  const { userLocation, isUserLocationError } = useUserLocation();
  const mapRef = useRef<MapView | null>(null);
  const inset = useSafeAreaInsets();
  usePermission('LOCATION');

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...numbers.INITIAL_DELTA,
    });
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }

    moveMapView(userLocation);
  };

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
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
      />
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
