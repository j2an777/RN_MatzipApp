import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Ref } from 'react';

import { colors } from '@/constants/colors';

interface InputFieldProps extends TextInputProps {
  ref?: Ref<TextInput>;
  errorMessage?: string;
  touched?: boolean;
}

const InputField = ({
  ref,
  errorMessage,
  touched,
  ...props
}: InputFieldProps) => {
  return (
    <View>
      <TextInput
        ref={ref}
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
        style={[styles.input, touched && errorMessage && styles.inputError]}
        {...props}
      />
      {touched && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  errorText: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
