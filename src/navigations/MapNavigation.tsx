import { createStackNavigator } from '@react-navigation/stack';

import SearchLocationScreen from '@/screens/map/SearchLocationScreen';
import AddLocationScreen from '@/screens/map/AddLocationScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import { colors } from '@/constants/colors';

const MapStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.BLACK,
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.GRAY_500,
    },
    headerTitleStyle: {
      fontSize: 16,
    },
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
  },
  screens: {
    MapHome: {
      screen: MapHomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddLocation: {
      screen: AddLocationScreen,
      options: {
        title: '장소 추가',
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      },
    },
    SearchLocation: {
      screen: SearchLocationScreen,
    },
  },
});

export default MapStack;
