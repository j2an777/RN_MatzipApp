import { Dimensions, StyleSheet, Text, View } from 'react-native';

import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DayOfWeeks = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, idx) => {
        return (
          <View key={idx} style={styles.item}>
            <Text
              style={[
                styles.text,
                dayOfWeek === '토' && styles.staturdayText,
                dayOfWeek === '일' && styles.sundayText,
              ]}>
              {dayOfWeek}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    item: {
      width: DEVICE_WIDTH / 7,
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      color: colors[theme].BLACK,
    },
    staturdayText: {
      color: colors[theme].BLUE_500,
    },
    sundayText: {
      color: colors[theme].RED_500,
    },
  });

export default DayOfWeeks;
