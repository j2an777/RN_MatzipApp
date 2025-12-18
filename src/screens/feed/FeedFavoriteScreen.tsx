import { SafeAreaView, StyleSheet } from 'react-native';

import FeedFavoriteList from '@/components/feed/FeedFavoriteList';

const FeedFavoriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoriteList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedFavoriteScreen;
