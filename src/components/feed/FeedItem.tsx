import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getDateWithSeparator } from '@/utils/getDate';
import { Post } from '@/types/domain';
import { baseUrls } from '@/api';

const FeedItem = ({ post }: { post: Post }) => {
  return (
    <Pressable style={styles.container}>
      {post.imageUris.length > 0 && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `${
                Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
              }/${post.imageUris[0].uri}`,
            }}
          />
        </View>
      )}
      {post.imageUris.length === 0 && (
        <View style={[styles.imageContainer, styles.emptyContainer]}>
          <Text style={styles.descriptionText}>No Image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>
          {getDateWithSeparator(post.date, '/')}
        </Text>
        <Text style={styles.titleText}>{post.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={1}>
          {post.description}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 12,
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 2,
    height: Dimensions.get('screen').width / 2,
  },
  image: {},
  emptyContainer: {},
  descriptionText: {},
  textContainer: {},
  dateText: {},
  titleText: {},
});

export default FeedItem;
