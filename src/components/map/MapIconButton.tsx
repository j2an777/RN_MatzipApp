import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Pressable, StyleSheet } from 'react-native';
import { ComponentProps } from 'react';

import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';

type SolidIconName = Extract<
  ComponentProps<typeof FontAwesome6>,
  { iconStyle: 'solid' }
>['name'];

interface Props {
  iconName: SolidIconName;
  onPress: () => void;
}

const MapIconButton = ({ iconName, onPress }: Props) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.mapButton} onPress={onPress}>
      <FontAwesome6
        iconStyle="solid"
        size={25}
        color={colors[theme].WHITE}
        name={iconName}
      />
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    mapButton: {
      backgroundColor: colors[theme].PINK_700,
      marginVertical: 5,
      width: 45,
      height: 45,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    },
  });

export default MapIconButton;
