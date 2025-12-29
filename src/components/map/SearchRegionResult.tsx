import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';

import useThemeStore, { Theme } from '@/store/theme';
import useLocationStore from '@/store/location';
import { RegionInfo } from '@/types/region';
import { colors } from '@/constants/colors';

const SearchRegionResult = ({ regionInfo }: { regionInfo: RegionInfo[] }) => {
  const { setMoveLocation, setSelectLocation } = useLocationStore();
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const handlePressRegionInfo = (latitude: string, longitude: string) => {
    const regionLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    moveToMapScreen(regionLocation);
  };

  const moveToMapScreen = (location: LatLng) => {
    navigation.goBack();

    setMoveLocation(location);
    setSelectLocation(location);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {regionInfo.map((info, idx) => (
          <Pressable
            key={info.id}
            style={[
              styles.itemBorder,
              idx === regionInfo.length - 1 && styles.noItemBorder,
            ]}
            onPress={() => handlePressRegionInfo(info.y, info.x)}>
            <View style={styles.placeNameContainer}>
              <Ionicons
                name="location"
                size={10}
                color={colors[theme].PINK_700}
              />
              <Text
                style={styles.placeText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {info.place_name}
              </Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.distanceText}>
                {(Number(info.distance) / 1000).toFixed(2)}km
              </Text>
              <Text style={styles.subInfoText}>{info.category_name}</Text>
            </View>
            <Text style={styles.subInfoText}>{info.road_address_name}</Text>
          </Pressable>
        ))}

        {regionInfo.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 5,
      height: Dimensions.get('screen').height / 2,
      marginVertical: 5,
      width: '100%',
    },
    scrollContainer: {
      padding: 10,
    },
    itemBorder: {
      marginHorizontal: 5,
      paddingVertical: 10,
      borderBottomColor: colors[theme].GRAY_300,
      borderBottomWidth: StyleSheet.hairlineWidth,
      gap: 3,
    },
    noItemBorder: {
      borderBottomWidth: 0,
      paddingBottom: 20,
    },
    placeNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    placeText: {
      color: colors[theme].BLACK,
      flexShrink: 1,
      fontSize: 16,
      fontWeight: '600',
    },
    categoryContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    distanceText: {
      color: colors[theme].BLACK,
    },
    subInfoText: {
      color: colors[theme].GRAY_500,
      flexShrink: 1,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50,
    },
    emptyText: {
      color: colors[theme].GRAY_500,
      fontSize: 16,
    },
  });

export default SearchRegionResult;
