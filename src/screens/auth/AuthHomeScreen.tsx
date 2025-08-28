import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, Text} from 'react-native';

import {AuthStackParamList} from '../../types/navigation';

type Navigation = StackNavigationProp<AuthStackParamList>;

const AuthHomeScreen = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate('Login')}>로그인으로 이동</Text>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
