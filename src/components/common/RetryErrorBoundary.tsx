import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';
import { PropsWithChildren } from 'react';

import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';

import CustomButton from './CustomButton';

const RetryErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <View style={styles.container}>
          <Text style={styles.titleText}>잠시 후 다시 시도해주세요.</Text>
          <Text style={styles.descriptionText}>
            요청 사항을 처리하는데 실패했습니다.
          </Text>
          <CustomButton
            label="다시 시도"
            variant="outlined"
            onPress={resetErrorBoundary}
            style={{ width: '50%' }}
          />
        </View>
      )}>
      {children}
    </ErrorBoundary>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      backgroundColor: colors[theme].WHITE,
    },
    titleText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors[theme].BLACK,
    },
    descriptionText: {
      fontSize: 15,
      color: colors[theme].GRAY_500,
    },
  });

export default RetryErrorBoundary;
