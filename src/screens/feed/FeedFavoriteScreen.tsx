import { SafeAreaView, StyleSheet } from 'react-native';
import { Suspense } from 'react';

import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import Indicator from '@/components/common/Indicator';
import { colors } from '@/constants/colors';
import useThemeStore from '@/store/theme';

const FeedFavoriteScreen = () => {
  const { theme } = useThemeStore();

  return (
    <SafeAreaView style={styles.container}>
      <Suspense
        fallback={<Indicator size={'large'} color={colors[theme].PINK_500} />}>
        <FeedFavoriteList />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedFavoriteScreen;
