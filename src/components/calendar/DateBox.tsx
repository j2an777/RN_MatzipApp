import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DateBox = ({ date }: { date: number }) => {
  return (
    <Pressable style={styles.container}>
      {date > 0 && (
        <View style={styles.dateContainer}>
          <Text>{date}</Text>
        </View>
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
});

export default DateBox;
