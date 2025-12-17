import ActionSheet from '@/components/common/ActionSheet';

interface FeedDetailActionSheetProps {
  isVisible: boolean;
  hideAction: () => void;
}

const FeedDetailActionSheet = ({
  isVisible,
  hideAction,
}: FeedDetailActionSheetProps) => {
  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button isDanger>삭제하기</ActionSheet.Button>
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
