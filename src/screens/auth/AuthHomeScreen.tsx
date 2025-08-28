import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, Text} from 'react-native';

const AuthHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate('Login')}>로그인으로 이동</Text>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
