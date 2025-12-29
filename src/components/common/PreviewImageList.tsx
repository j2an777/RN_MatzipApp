import { Image, Platform, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { FeedStackParamList } from '@/types/navigation';
import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';
import { ImageUri } from '@/types/domain';
import { baseUrls } from '@/api';

interface Props {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
}

const PreviewImageList = ({ imageUris, onDelete }: Props) => {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const route = useRoute<RouteProp<FeedStackParamList>>();
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const handlePressImage = (idx: number) => {
    navigation.navigate('ImageZoom', {
      id: route.params?.id,
      index: idx,
    });
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {imageUris.map(({ uri }, idx) => {
        return (
          <Pressable
            key={uri}
            style={styles.imageContainer}
            onPress={() => handlePressImage(idx)}>
            <Image
              style={styles.imageBox}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${uri}`,
              }}
              resizeMode="cover"
            />
            {onDelete && (
              <Pressable
                style={styles.deleteBtn}
                onPress={() => onDelete?.(uri)}>
                <Ionicons name="close" size={16} color={colors[theme].WHITE} />
              </Pressable>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
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
      backgroundColor: colors[theme].BLACK,
    },
  });

export default PreviewImageList;
