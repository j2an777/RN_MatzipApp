import useAuth from '@/hooks/queries/useAuth';

import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = () => {
  const { isLogin } = useAuth();

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RootNavigation;
