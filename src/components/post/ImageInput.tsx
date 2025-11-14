import Ionicons from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';

interface Props {
  onChange: () => void;
}

const ImageInput = ({ onChange }: Props) => {
  return (
    <Pressable
      onPress={onChange}
      style={({ pressed }) => [
        pressed && style.pressedContainer,
        style.imageContainer,
      ]}>
      <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text style={style.imageText}>사진 추가</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  imageContainer: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_300,
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
    color: colors.GRAY_500,
  },
});

export default ImageInput;
