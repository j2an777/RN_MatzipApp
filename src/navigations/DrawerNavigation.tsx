import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '@/components/common/CustomDrawerContent';
import CalendarScreen from '@/screens/calendar/CalendarScreen';
import DrawerButton from '@/components/common/DrawerButton';
import DrawerIcons from '@/components/common/DrawerIcons';
import { MainDrawerParamList } from '@/types/navigation';
import { colors } from '@/constants/colors';
import useThemeStore from '@/store/theme';

import SettingStack from './SettingNavigation';
import FeedStack from './FeedNavigation';
import MapStack from './MapNavigation';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const { theme } = useThemeStore();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerStyle: {
          width: '60%',
          backgroundColor: colors[theme].WHITE,
        },
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerItemStyle: {
          borderRadius: 5,
        },
        drawerType: 'front',
        drawerActiveTintColor: colors[theme].WHITE,
        drawerActiveBackgroundColor: colors[theme].PINK_700,
        drawerInactiveTintColor: colors[theme].GRAY_500,
        drawerInactiveBackgroundColor: colors[theme].GRAY_100,
        drawerIcon: ({ focused }) =>
          DrawerIcons(route.name as keyof MainDrawerParamList, focused, theme),
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
      })}>
      <Drawer.Screen
        name="Map"
        component={MapStack}
        options={{ title: '홈', headerShown: false }}
      />
      <Drawer.Screen
        name="Feed"
        component={FeedStack}
        options={{ title: '피드', headerShown: false }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: '캘린더', headerLeft: () => <DrawerButton /> }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingStack}
        options={{
          title: '설정',
          headerShown: false,
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
