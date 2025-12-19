import { SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';

import { getMonthYearDetails, getNewMonthYear } from '@/utils/getDate';
import Calendar from '@/components/calendar/Calendar';
import { colors } from '@/constants/colors';

const CalendarScreen = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const handleUpdateMonth = (increment: number) =>
    setMonthYear(prev => getNewMonthYear(prev, increment));

  return (
    <SafeAreaView style={styles.container}>
      <Calendar monthYear={monthYear} onChangeMonth={handleUpdateMonth} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarScreen;
