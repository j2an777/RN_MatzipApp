import {DrawerNavigationProp} from '@react-navigation/drawer';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet} from 'react-native';

import {MainDrawerParamList} from '../types/navigation';
import {colors} from '../constants/colors';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

const DrawerButton = ({color = colors.BLACK}) => {
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable onPress={() => navigation.openDrawer()} style={styles.container}>
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
