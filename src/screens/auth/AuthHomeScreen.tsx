import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '@/components/common/CustomButton';
import { AuthStackParamList } from '@/types/navigation';
import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';

type Navigation = StackNavigationProp<AuthStackParamList>;

const AuthHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="이메일 로그인"
          onPress={() => navigation.navigate('Login')}
        />
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
      flex: 1.5,
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: '100%',
    },
    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 30,
      gap: 5,
    },
    emailText: {
      textDecorationLine: 'underline',
      fontWeight: 500,
      padding: 10,
      color: colors[theme].BLACK,
    },
  });

export default AuthHomeScreen;
