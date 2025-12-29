import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useThemeStore, { Theme } from '@/store/theme';
import { colors } from '@/constants/colors';

import CustomMarker from '../common/CustomMarker';

interface Props {
  color: string;
  score: number;
  onChangeColor: (value: string) => void;
}

const MarkerColorInput = ({ color, score, onChangeColor }: Props) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커 선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            colors[theme].PINK_400,
            colors[theme].BLUE_400,
            colors[theme].YELLOW_400,
            colors[theme].GREEN_400,
            colors[theme].PURPLE_400,
          ].map(selectColor => {
            return (
              <Pressable
                key={selectColor}
                onPress={() => onChangeColor(selectColor)}
                style={[
                  styles.markerBox,
                  color === selectColor && styles.pressedMarker,
                ]}>
                <CustomMarker color={selectColor} score={score} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      padding: 15,
    },
    markerLabel: {
      marginBottom: 15,
      color: colors[theme].GRAY_700,
    },
    markerInputScroll: {
      flexDirection: 'row',
      gap: 20,
    },
    markerBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_100,
    },
    pressedMarker: {
      borderWidth: 2,
      borderColor: colors[theme].RED_500,
    },
  });

export default MarkerColorInput;
