import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = () => {
  const isLogin = true;

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RootNavigation;
