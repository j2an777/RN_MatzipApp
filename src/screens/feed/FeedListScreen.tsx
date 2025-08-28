import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, Text} from 'react-native';

import {FeedStackParamList} from '../../types/navigation';

type Navigation = StackNavigationProp<FeedStackParamList>;

const FeedListScreen = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView>
      <Text>FeedListScreen</Text>
      <Text onPress={() => navigation.navigate('FeedDetail', {id: 1})}>
        1번 장소
      </Text>
    </SafeAreaView>
  );
};

export default FeedListScreen;
