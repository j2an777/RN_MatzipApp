import { SafeAreaView, Text } from 'react-native';

import DrawerButton from '@/components/DrawerButton';
import useAuth from '@/hooks/queries/useAuth';

const MapHomeScreen = () => {
  const { logoutMutation } = useAuth();

  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
      <Text onPress={() => logoutMutation.mutate(null)}>로그아웃</Text>
    </SafeAreaView>
  );
};

export default MapHomeScreen;
