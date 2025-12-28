import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from '@/hooks/queries/useAuth';

import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = () => {
  const { isLogin } = useAuth();

  return (
    <RetryErrorBoundary>
      <NavigationContainer>
        {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </RetryErrorBoundary>
  );
};

export default RootNavigation;
