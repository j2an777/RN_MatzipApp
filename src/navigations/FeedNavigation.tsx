import {createStackNavigator} from '@react-navigation/stack';

import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import EditLocationScreen from '@/screens/feed/EditLocationScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedListScreen from '@/screens/feed/FeedListScreen';
import DrawerButton from '@/components/DrawerButton';
import {colors} from '@/constants/colors';

const FeedStack = createStackNavigator({
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
    FeedList: {
      screen: FeedListScreen,
      options: {
        title: '피드',
        headerLeft: () => <DrawerButton />,
      },
    },
    FeedDetail: {
      screen: FeedDetailScreen,
    },
    FeedFavorite: {
      screen: FeedFavoriteScreen,
    },
    EditLocation: {
      screen: EditLocationScreen,
    },
  },
});

export default FeedStack;
