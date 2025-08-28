import {createStaticNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CalendarScreen from '../screens/calendar/CalendarScreen';

import FeedStack from './FeedNavigation';
import MapStack from './MapNavigation';

const MainDrawer = createDrawerNavigator({
  screens: {
    Map: {
      screen: MapStack,
    },
    Feed: {
      screen: FeedStack,
    },
    Calendar: {
      screen: CalendarScreen,
    },
  },
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
