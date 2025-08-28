import {createStaticNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import {MainDrawerParamList} from '../types/navigation';
import DrawerButton from '../components/DrawerButton';
import DrawerIcons from '../hooks/drawerIcons';
import {colors} from '../constants/colors';

import FeedStack from './FeedNavigation';
import MapStack from './MapNavigation';

const MainDrawer = createDrawerNavigator({
  screenOptions: ({route}) => {
    return {
      drawerStyle: {
        width: '60%',
        backgroundColor: colors.WHITE,
      },
      drawerLabelStyle: {
        fontWeight: '600',
      },
      drawerItemStyle: {
        borderRadius: 5,
      },
      drawerType: 'front',
      drawerActiveTintColor: colors.WHITE,
      drawerActiveBackgroundColor: colors.PINK_700,
      drawerInactiveTintColor: colors.GRAY_500,
      drawerInactiveBackgroundColor: colors.GRAY_100,
      drawerIcon: ({focused}) =>
        DrawerIcons(route.name as keyof MainDrawerParamList, focused),
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
    };
  },
  screens: {
    Map: {
      screen: MapStack,
      options: {
        title: '홈',
        headerShown: false,
      },
    },
    Feed: {
      screen: FeedStack,
      options: {
        title: '피드',
        headerShown: false,
      },
    },
    Calendar: {
      screen: CalendarScreen,
      options: {
        title: '캘린더',
        headerLeft: () => <DrawerButton />,
      },
    },
  },
  drawerContent: props => <CustomDrawerContent {...props} />,
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
