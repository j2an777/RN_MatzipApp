import Ionicons from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text } from 'react-native';

import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';

const ImageInput = ({ onChange }: { onChange: () => void }) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      onPress={onChange}
      style={({ pressed }) => [
        pressed && styles.pressedContainer,
        styles.imageContainer,
      ]}>
      <Ionicons
        name="camera-outline"
        size={20}
        color={colors[theme].GRAY_500}
      />
      <Text style={styles.imageText}>사진 추가</Text>
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    imageContainer: {
      borderWidth: 1.5,
      borderStyle: 'dotted',
      borderColor: colors[theme].GRAY_300,
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    pressedContainer: {
      opacity: 0.7,
    },
    imageText: {
      fontSize: 12,
      color: colors[theme].GRAY_500,
    },
  });

export default ImageInput;
