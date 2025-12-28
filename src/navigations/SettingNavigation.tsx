import { createStackNavigator } from '@react-navigation/stack';

import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import DrawerButton from '@/components/common/DrawerButton';
import { SettingStackParamList } from '@/types/navigation';
import { colors } from '@/constants/colors';
import useThemeStore from '@/store/theme';

const Stack = createStackNavigator<SettingStackParamList>();

const SettingStack = () => {
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
        name="SettingHome"
        component={SettingHomeScreen}
        options={{
          title: '설정',
          headerLeft: () => <DrawerButton />,
          cardStyle: {
            backgroundColor: colors[theme].GRAY_200,
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: '프로필 수정',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
