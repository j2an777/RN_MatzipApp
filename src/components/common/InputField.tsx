import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Ref } from 'react';

import useThemeStore, { Theme } from '@/store/theme';
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
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View>
      <TextInput
        ref={ref}
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
        placeholderTextColor={colors[theme].GRAY_500}
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

const styling = (theme: Theme) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      justifyContent: 'center',
      height: 50,
      paddingHorizontal: 10,
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].RED_300,
    },
    errorText: {
      color: colors[theme].RED_500,
      fontSize: 12,
      paddingTop: 5,
    },
    multiline: {
      height: 150,
      paddingVertical: 10,
      textAlignVertical: 'top',
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
  });

export default InputField;
