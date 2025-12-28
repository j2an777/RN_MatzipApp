import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { MainDrawerParamList } from '@/types/navigation';
import { colors } from '@/constants/colors';
import { Theme } from '@/store/theme';

type DrawerIconName = 'map' | 'book' | 'calendar';

const DrawerIcons = (
  routeName: keyof MainDrawerParamList,
  focused: boolean,
  theme: Theme,
) => {
  let iconName: DrawerIconName = 'map';

  switch (routeName) {
    case 'Map': {
      iconName = 'map';
      break;
    }
    case 'Feed': {
      iconName = 'book';
      break;
    }
    case 'Calendar': {
      iconName = 'calendar';
      break;
    }
  }

  return (
    <FontAwesome6
      name={iconName}
      size={20}
      iconStyle="solid"
      color={focused ? colors[theme].WHITE : colors[theme].GRAY_300}
    />
  );
};

export default DrawerIcons;
