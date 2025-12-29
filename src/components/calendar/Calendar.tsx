import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { MonthYear, ResponseCalendarPost } from '@/types/calendar';
import { isSameAsCurrentDate } from '@/utils/getDate';
import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';
import useModal from '@/hooks/useModal';

import YearSelector from './YearSelector';
import DayOfWeeks from './DayOfWeeks';
import DateBox from './DateBox';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
  selectedDate: number;
  onPressDate: (date: number) => void;
  schedules: ResponseCalendarPost;
}

const Calendar = ({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
  schedules,
}: CalendarProps) => {
  const { month, year, firstDOW, lastDate } = monthYear;
  const { isVisible, hide, show } = useModal();
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    hide();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(-1)}>
          <Ionicons name="arrow-back" size={25} color={colors[theme].BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer} onPress={show}>
          <Text style={styles.monthYearText}>
            {year}년 {month}월
          </Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color={colors[theme].GRAY_500}
            style={{ marginTop: 4 }}
          />
        </Pressable>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(1)}>
          <Ionicons
            name="arrow-forward"
            size={25}
            color={colors[theme].BLACK}
          />
        </Pressable>
      </View>
      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({ length: lastDate + firstDOW }, (_, idx) => ({
            id: idx,
            date: idx - firstDOW + 1,
          }))}
          renderItem={({ item }) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              hasSchedule={!!schedules[item.date]}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
      <YearSelector
        isVisible={isVisible}
        currentYear={year}
        onChangeYear={handleChangeYear}
        hide={hide}
      />
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 25,
      marginVertical: 16,
    },
    monthYearContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      gap: 4,
    },
    monthButton: {
      padding: 10,
    },
    monthYearText: {
      fontSize: 18,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
    bodyContainer: {
      backgroundColor: colors[theme].GRAY_100,
      borderBottomColor: colors[theme].GRAY_300,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

export default Calendar;
