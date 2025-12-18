import { FlatList, StyleSheet } from 'react-native';

import useGetFavoritePost from '@/hooks/queries/useGetFavoritePosts';

import FeedItem from './FeedItem';

const FeedFavoriteList = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetFavoritePost();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const handleRefresh = async () => await refetch();

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={handleRefresh}
      refreshing={isLoading}
      scrollIndicatorInsets={{ right: 1 }}
      indicatorStyle="black"
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedFavoriteList;
