import AuthNavigation from './AuthNavigation';
import DrawerNavigation from './DrawerNavigation';

const RootNavigation = () => {
  const isLogin = true;

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RootNavigation;
