import { FlatList, StyleSheet } from 'react-native';

import useGetInfinitePost from '@/hooks/queries/useGetInfinitePosts';

import FeedItem from './FeedItem';

const FeedList = () => {
  const { data: posts } = useGetInfinitePost();

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({});

export default FeedList;
