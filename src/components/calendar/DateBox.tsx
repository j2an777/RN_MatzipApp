import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface DateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
  isToday: boolean;
  hasSchedule: boolean;
}

const DateBox = ({
  date,
  selectedDate,
  onPressDate,
  isToday,
  hasSchedule,
}: DateBoxProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                isToday && styles.todayText,
                selectedDate === date && styles.selectedDateText,
              ]}>
              {date}
            </Text>
          </View>
          {hasSchedule && <View style={styles.scheduleIndicator} />}
        </>
      )}
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: DEVICE_WIDTH / 7,
      height: DEVICE_WIDTH / 7,
      alignItems: 'center',
    },
    dateContainer: {
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 28,
    },
    dateText: {
      fontSize: 17,
      color: colors[theme].BLACK,
    },
    selectedContainer: {
      backgroundColor: colors[theme].BLACK,
    },
    selectedDateText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    todayText: {
      color: colors[theme].PINK_700,
      fontWeight: 'bold',
    },
    scheduleIndicator: {
      marginTop: 2,
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_500,
    },
  });

export default DateBox;
