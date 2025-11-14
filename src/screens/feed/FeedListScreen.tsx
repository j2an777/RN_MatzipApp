import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { FeedStackParamList } from '@/types/navigation';

const FeedListScreen = () => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedListScreen;
