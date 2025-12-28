import { createStackNavigator } from '@react-navigation/stack';

import SearchLocationScreen from '@/screens/map/SearchLocationScreen';
import AddLocationScreen from '@/screens/map/AddLocationScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import { MapStackParamList } from '@/types/navigation';
import { colors } from '@/constants/colors';
import useThemeStore from '@/store/theme';

const Stack = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  const { theme } = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors[theme].BLACK,
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_500,
        },
        headerTitleStyle: {
          fontSize: 16,
        },
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
      }}>
      <Stack.Screen
        name="MapHome"
        component={MapHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{
          title: '장소 추가',
          cardStyle: { backgroundColor: colors[theme].WHITE },
        }}
      />
      <Stack.Screen
        name="SearchLocation"
        component={SearchLocationScreen}
        options={{
          title: '장소 검색',
          presentation: 'modal',
          cardStyle: { backgroundColor: colors[theme].WHITE },
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStack;
