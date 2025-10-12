import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

import { MainDrawerParamList } from '@/types/navigation';
import { colors } from '@/constants/colors';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface Props {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const DrawerButton = ({ style, color = colors.BLACK }: Props) => {
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable
      onPress={() => navigation.openDrawer()}
      style={[styles.container, style]}>
      <Ionicons name="menu" size={25} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default DrawerButton;
