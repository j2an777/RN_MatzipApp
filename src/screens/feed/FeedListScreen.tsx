import { SafeAreaView, StyleSheet } from 'react-native';
import { Suspense } from 'react';

import Indicator from '@/components/common/Indicator';
import FeedList from '@/components/feed/FeedList';
import { colors } from '@/constants/colors';

const FeedListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Indicator size={'large'} color={colors.PINK_500} />}>
        <FeedList />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedListScreen;
