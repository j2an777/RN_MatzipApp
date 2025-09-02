import { SafeAreaView, StyleSheet, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import { validationSignup } from '@/utils/validation';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';

const SignupScreen = () => {
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validationSignup,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          touched={signup.touched.email}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호"
          touched={signup.touched.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          secureTextEntry
          placeholder="비밀번호 확인"
          touched={signup.touched.passwordConfirm}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" variant="filled" size="large" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
