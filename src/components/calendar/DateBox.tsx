import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
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
    color: colors.BLACK,
  },
  selectedContainer: {
    backgroundColor: colors.BLACK,
  },
  selectedDateText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  todayText: {
    color: colors.PINK_700,
    fontWeight: 'bold',
  },
  scheduleIndicator: {
    marginTop: 2,
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.GRAY_500,
  },
});

export default DateBox;
