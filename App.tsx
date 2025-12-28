import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';

import RootNavigation from '@/navigations/RootNavigation';
import useThemeStorage from '@/hooks/useThemeStorage';
import queryClient from '@/api/queryClient';
import { colors } from '@/constants/colors';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors['light'].BLUE_500 }}
      text1Style={{ fontSize: 14 }}
      text2Style={{ fontSize: 12 }}
    />
  ),

  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors['light'].RED_500 }}
      text1Style={{ fontSize: 14 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
};

function App() {
  const { theme } = useThemeStorage();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <RootNavigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;
