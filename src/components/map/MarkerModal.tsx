import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

import { getDateWithSeparator } from '@/utils/getDate';
import useGetPost from '@/hooks/queries/useGetPosts';
import { colors } from '@/constants/colors';
import { baseUrls } from '@/api';

interface Props {
  markerId: number;
  isVisible: boolean;
  hide: () => void;
}

const MarkerModal = ({ markerId, isVisible, hide }: Props) => {
  const navigation = useNavigation();
  const { data: post, isPending, isError } = useGetPost(markerId);

  const handlePressModal = () => {
    navigation.navigate('Feed', {
      screen: 'FeedDetail',
      params: {
        id: post?.id as number,
      },
      initial: false,
    });

    hide();
  };

  if (isPending || isError) return <></>;

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={styles.background} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardAlign}>
            <View style={styles.cardInner}>
              {post?.imageUris.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${
                        Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                      }/${post.imageUris[0].uri}`,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
              {post.imageUris.length === 0 && (
                <View style={[styles.imageContainer, styles.emptyContainer]}>
                  <Text style={styles.emptyText}>No Image</Text>
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <Ionicons
                    name="location-outline"
                    size={10}
                    color={colors.GRAY_500}
                  />
                  <Text
                    style={styles.addressText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {post.address}
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.titleText}>
                  {post.title}
                </Text>
                <Text style={styles.dateText}>
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
              <View style={styles.nextBtn}>
                <Ionicons
                  name="chevron-forward"
                  size={25}
                  color={colors.BLACK}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.GRAY_500,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  emptyText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  infoContainer: {
    marginLeft: 15,
    gap: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  addressText: {
    fontSize: 10,
    color: colors.GRAY_500,
  },
  titleText: {
    fontSize: 15,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    color: colors.PINK_700,
    fontWeight: 'bold',
  },
  nextBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default MarkerModal;
