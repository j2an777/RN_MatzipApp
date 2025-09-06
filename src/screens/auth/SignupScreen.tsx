import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { useRef } from 'react';

import { validationSignup } from '@/utils/validation';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';

const SignupScreen = () => {
  const { signupMutation, loginMutation } = useAuth();
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validationSignup,
  });

  const handleSubmit = () => {
    const { email, password } = signup.values;
    signupMutation.mutate(
      { email, password },
      { onSuccess: () => loginMutation.mutate({ email, password }) },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          submitBehavior="submit"
          inputMode="email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          touched={signup.touched.email}
          errorMessage={signup.errors.email}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호"
          submitBehavior="submit"
          returnKeyType="next"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          touched={signup.touched.password}
          errorMessage={signup.errors.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          secureTextEntry
          placeholder="비밀번호 확인"
          returnKeyType="join"
          touched={signup.touched.passwordConfirm}
          onSubmitEditing={handleSubmit}
          errorMessage={signup.errors.passwordConfirm}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton
        label="회원가입"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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
