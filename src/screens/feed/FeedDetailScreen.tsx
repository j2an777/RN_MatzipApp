import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text} from 'react-native';

import {FeedStackParamList} from '../../types/navigation';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

const FeedDetailScreen = ({route}: Props) => {
  const {id} = route.params;

  return (
    <SafeAreaView>
      <Text>FeedDetailScreen {id}</Text>
    </SafeAreaView>
  );
};

export default FeedDetailScreen;
