import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';

import CustomButton from './CustomButton';

interface Props {
  label: string;
  onPress: () => void;
}

const FixedBottomCTA = ({ label, onPress }: Props) => {
  const inset = useSafeAreaInsets();
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View
      style={[styles.fixedContainer, { paddingBottom: inset.bottom || 12 }]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    fixedContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingTop: 12,
      paddingHorizontal: 16,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors[theme].GRAY_300,
    },
  });

export default FixedBottomCTA;
