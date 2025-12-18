import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { colors } from '@/constants/colors';
import { ImageUri } from '@/types/domain';
import { baseUrls } from '@/api';

interface Props {
  images: ImageUri[];
  pressedIndex?: number;
}

const ImageCarousel = ({ images, pressedIndex = 0 }: Props) => {
  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [page, setPage] = useState(pressedIndex);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const devideWidth = Dimensions.get('window').width;

  const handleScrollPage = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / devideWidth);
    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, { marginTop: insets.top + 10 }]}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color={colors.WHITE} />
      </Pressable>

      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={{ width: devideWidth }}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        onScroll={handleScrollPage}
        horizontal
        pagingEnabled
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(pressedIndex);
        }}
        getItemLayout={(_, index) => ({
          length: devideWidth,
          offset: devideWidth * index,
          index,
        })}
      />

      <View style={[styles.pageContainer, { bottom: insets.bottom + 10 }]}>
        {Array.from({ length: images.length }, (_, index) => (
          <View
            key={index}
            style={[styles.pageDot, index === page && styles.currentPageDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BLACK,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  pageDot: {
    margin: 4,
    backgroundColor: colors.GRAY_200,
    width: 8,
    height: 8,
    borderRadius: 8,
  },
  currentPageDot: {
    backgroundColor: colors.PINK_500,
  },
});

export default ImageCarousel;
