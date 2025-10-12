import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';

import DrawerButton from '@/components/DrawerButton';
import { colors } from '@/constants/colors';

const MapHomeScreen = () => {
  const inset = useSafeAreaInsets();

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, { top: inset.top + 10 }]}
        color={colors.WHITE}
      />
      <MapView style={styles.container} provider={PROVIDER_GOOGLE} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
});

export default MapHomeScreen;
