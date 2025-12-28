import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';

import DarkModeActionSheet from '@/components/common/DarkModeActionSheet';
import SettingItem from '@/components/setting/SettingItem';
import { SettingStackParamList } from '@/types/navigation';
import useAuth from '@/hooks/queries/useAuth';
import { colors } from '@/constants/colors';
import useModal from '@/hooks/useModal';

type Navigation = NavigationProp<SettingStackParamList>;

const SettingHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { logoutMutation } = useAuth();
  const darkModeAction = useModal();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="프로필 수정"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem title="다크 모드" onPress={() => darkModeAction.show()} />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          color={colors.RED_500}
          onPress={() => logoutMutation.mutate(null)}
        />
        <DarkModeActionSheet
          isVisible={darkModeAction.isVisible}
          hideAction={darkModeAction.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
