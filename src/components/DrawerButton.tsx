import {useNavigation} from '@react-navigation/native';
import {Pressable, Text} from 'react-native';

const DrawerButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Text style={{fontSize: 20}}>서랍</Text>
    </Pressable>
  );
};

export default DrawerButton;
