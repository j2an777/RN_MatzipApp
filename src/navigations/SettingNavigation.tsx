import { createStackNavigator } from '@react-navigation/stack';

import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import DrawerButton from '@/components/common/DrawerButton';
import { colors } from '@/constants/colors';

const SettingStack = createStackNavigator({
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
    SettingHome: {
      screen: SettingHomeScreen,
      options: {
        title: '설정',
        headerLeft: () => <DrawerButton />,
        cardStyle: {
          backgroundColor: colors.GRAY_200,
        },
      },
    },
    EditProfile: {
      screen: EditProfileScreen,
      options: {
        title: '프로필 수정',
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      },
    },
  },
});

export default SettingStack;
