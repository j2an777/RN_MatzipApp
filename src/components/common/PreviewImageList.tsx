import { Image, Platform, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { ScrollView } from 'react-native-gesture-handler';

import { colors } from '@/constants/colors';
import { ImageUri } from '@/types/domain';
import { baseUrls } from '@/api';

interface Props {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
}

const PreviewImageList = ({ imageUris, onDelete }: Props) => {
  return (
    <ScrollView horizontal contentContainerStyle={style.container}>
      {imageUris.map(({ uri }) => {
        return (
          <Pressable key={uri} style={style.imageContainer}>
            <Image
              style={style.imageBox}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${uri}`,
              }}
              resizeMode="cover"
            />
            {onDelete && (
              <Pressable
                style={style.deleteBtn}
                onPress={() => onDelete?.(uri)}>
                <Ionicons name="close" size={16} color={colors.WHITE} />
              </Pressable>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  imageBox: {
    width: '100%',
    height: '100%',
  },
  deleteBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.BLACK,
  },
});

export default PreviewImageList;
