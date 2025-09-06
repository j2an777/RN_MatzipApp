import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';
import useAuth from '@/hooks/queries/useAuth';

const RootNavigation = () => {
  const { isLogin } = useAuth();

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RootNavigation;
