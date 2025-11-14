import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';

import CustomButton from './CustomButton';

interface Props {
  label: string;
  onPress: () => void;
}

const FixedBottomCTA = ({ label, onPress }: Props) => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[style.fixedContainer, { paddingBottom: inset.bottom || 12 }]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
};

const style = StyleSheet.create({
  fixedContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
  },
});

export default FixedBottomCTA;
