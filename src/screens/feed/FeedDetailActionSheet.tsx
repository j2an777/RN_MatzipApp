import { useNavigation } from '@react-navigation/native';

import ActionSheet from '@/components/common/ActionSheet';
import useDeletePost from '@/hooks/queries/useDeletePost';
import { Alert } from 'react-native';

interface FeedDetailActionSheetProps {
  id: number;
  isVisible: boolean;
  hideAction: () => void;
}

const FeedDetailActionSheet = ({
  id,
  isVisible,
  hideAction,
}: FeedDetailActionSheetProps) => {
  const navigation = useNavigation();
  const { mutate } = useDeletePost();

  const handleDeletePost = () => {
    Alert.alert('삭제하시겠습니까?', '피드와 지도에서 모두 삭제됩니다.', [
      {
        text: '삭제',
        onPress: () =>
          mutate(id, {
            onSuccess: () => {
              hideAction();
              navigation.goBack();
            },
          }),
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button>삭제하기</ActionSheet.Button>
        </ActionSheet.Container>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
};

export default FeedDetailActionSheet;
