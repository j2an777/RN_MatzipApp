import { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, StyleSheet, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import Toast from 'react-native-toast-message';
import { useState } from 'react';

import MarkerFilterModal from '@/components/map/MarkerFilterModal';
import { StackNavigationProp } from '@react-navigation/stack';
import DrawerButton from '@/components/common/DrawerButton';
import CustomMarker from '@/components/common/CustomMarker';
import MapIconButton from '@/components/map/MapIconButton';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import { useNavigation } from '@react-navigation/native';
import { MapStackParamList } from '@/types/navigation';
import MarkerModal from '@/components/map/MarkerModal';
import useUserLocation from '@/hooks/useUserLocation';
import useThemeStore, { Theme } from '@/store/theme';
import useMoveMapView from '@/hooks/useMoveMapView';
import usePermission from '@/hooks/usePermission';
import useLocationStore from '@/store/location';
import { numbers } from '@/constants/numbers';
import { colors } from '@/constants/colors';
import useFilterStore from '@/store/filter';
import useModal from '@/hooks/useModal';

type Navigation = StackNavigationProp<MapStackParamList>;

const MapHomeScreen = () => {
  const [markerId, setMarkerId] = useState<number>();

  const { moveMapView, handleChangeDelta, mapRef } = useMoveMapView();
  const { selectLocation, setSelectLocation } = useLocationStore();
  const { userLocation, isUserLocationError } = useUserLocation();
  const navigation = useNavigation<Navigation>();
  const { filters } = useFilterStore();
  const { theme } = useThemeStore();
  const inset = useSafeAreaInsets();
  const markerModal = useModal();
  const filterModal = useModal();
  const styles = styling(theme);

  const { data: markers = [] } = useGetMarkers({
    select: data =>
      data.filter(
        marker =>
          filters[marker.color] === true &&
          filters[String(marker.score)] === true,
      ),
  });

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

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    setMarkerId(id);
    moveMapView(coordinate);
    markerModal.show();
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요.',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }

    navigation.navigate('AddLocation', {
      location: selectLocation,
    });

    setSelectLocation(null);
  };

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, { top: inset.top + 10 }]}
        color={colors[theme].WHITE}
      />
      <MapView
        userInterfaceStyle={theme}
        googleMapId="792e4dcbf17857a42e139851"
        style={styles.container}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={handleChangeDelta}
        clusterColor={colors['light'].PINK_700}
        onLongPress={({ nativeEvent }) =>
          setSelectLocation(nativeEvent.coordinate)
        }
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}>
        {markers.map(marker => (
          <CustomMarker
            key={marker.id}
            color={marker.color}
            score={marker.score}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() =>
              handlePressMarker(marker.id, {
                latitude: marker.latitude,
                longitude: marker.longitude,
              })
            }
          />
        ))}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton
          iconName="magnifying-glass"
          onPress={() => navigation.navigate('SearchLocation')}
        />
        <MapIconButton iconName="filter" onPress={filterModal.show} />
        <MapIconButton iconName="plus" onPress={handlePressAddPost} />
        <MapIconButton
          iconName="location-crosshairs"
          onPress={handlePressUserLocation}
        />
      </View>
      <MarkerModal
        markerId={Number(markerId)}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
      <MarkerFilterModal
        isVisible={filterModal.isVisible}
        hideAction={filterModal.hide}
      />
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
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
      backgroundColor: colors[theme].PINK_700,
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
  });

export default MapHomeScreen;
