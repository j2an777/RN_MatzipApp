import { useColorScheme } from 'react-native';

import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

import ActionSheet from './ActionSheet';

interface DarkModeActionSheetProps {
  isVisible: boolean;
  hideAction: () => void;
}

const DarkModeActionSheet = ({
  isVisible,
  hideAction,
}: DarkModeActionSheetProps) => {
  const { theme, isSystem, setMode, setSystem } = useThemeStorage();
  const systemDefault = useColorScheme();

  const handlePressMode = (type: Theme) => {
    setMode(type);
    setSystem(false);
    hideAction();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideAction();
  };

  return (
    <ActionSheet
      isVisible={isVisible}
      hideAction={hideAction}
      animationType="slide">
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button
            onPress={() => handlePressMode('light')}
            isChecked={!isSystem && theme === 'light'}>
            라이트 모드
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button
            onPress={() => handlePressMode('dark')}
            isChecked={!isSystem && theme === 'dark'}>
            다크 모드
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button onPress={handlePressSystem} isChecked={isSystem}>
            시스템 기본값
          </ActionSheet.Button>
        </ActionSheet.Container>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
};

export default DarkModeActionSheet;
