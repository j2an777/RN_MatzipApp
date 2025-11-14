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
  disabled?: boolean;
}

const InputField = ({
  ref,
  errorMessage,
  touched,
  disabled = false,
  ...props
}: InputFieldProps) => {
  return (
    <View>
      <TextInput
        ref={ref}
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
        placeholderTextColor={colors.GRAY_500}
        style={[
          styles.input,
          disabled && styles.disabled,
          props.multiline && styles.multiline,
          touched && errorMessage && styles.inputError,
        ]}
        editable={!disabled}
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
  multiline: {
    height: 150,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
});

export default InputField;
