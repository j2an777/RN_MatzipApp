import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import useAuth from '@/hooks/queries/useAuth';

import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = () => {
  const { isLogin } = useAuth();

  return (
    <RetryErrorBoundary>
      {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
    </RetryErrorBoundary>
  );
};

export default RootNavigation;
