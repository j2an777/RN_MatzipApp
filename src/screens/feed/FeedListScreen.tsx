import { SafeAreaView, StyleSheet } from 'react-native';

import FeedList from '@/components/feed/FeedList';

const FeedListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedListScreen;
