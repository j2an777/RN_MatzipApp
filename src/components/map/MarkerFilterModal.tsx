import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { colors } from '@/constants/colors';
import useFilterStore from '@/store/filter';
import useThemeStore from '@/store/theme';

import ActionSheet from '../common/ActionSheet';

interface MarkerFilterModalProps {
  isVisible: boolean;
  hideAction: () => void;
}

const MarkerFilterModal = ({
  isVisible,
  hideAction,
}: MarkerFilterModalProps) => {
  const [filterCondition, setFilterCondition] = useState('색상');
  const { filters, setFilters } = useFilterStore();
  const { theme } = useThemeStore();

  const handleChangeFilter = (color: string) =>
    setFilters({ ...filters, [color]: !filters[color] });

  return (
    <ActionSheet
      isVisible={isVisible}
      hideAction={hideAction}
      animationType="fade">
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Title>마커 필터링</ActionSheet.Title>
          <ActionSheet.Divider />
          <View style={styles.filterContainer}>
            {['색상', '평점'].map(condition => (
              <ActionSheet.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => setFilterCondition(condition)}>
                {condition}
              </ActionSheet.Filter>
            ))}
          </View>
          <ActionSheet.Divider />
          {filterCondition === '색상' && (
            <>
              {[
                colors[theme].PINK_400,
                colors[theme].YELLOW_400,
                colors[theme].GREEN_400,
                colors[theme].BLUE_400,
                colors[theme].PURPLE_400,
              ].map(color => (
                <ActionSheet.CheckBox
                  key={color}
                  isChecked={filters[color]}
                  onPress={() => handleChangeFilter(color)}
                  icon={
                    <View style={[styles.marker, { backgroundColor: color }]} />
                  }
                />
              ))}
            </>
          )}
          {filterCondition === '평점' && (
            <>
              {['1', '2', '3', '4', '5'].map(score => (
                <ActionSheet.CheckBox
                  key={score}
                  isChecked={filters[score]}
                  onPress={() => handleChangeFilter(score)}>
                  {score}점
                </ActionSheet.CheckBox>
              ))}
            </>
          )}
          <ActionSheet.Divider />
          <ActionSheet.Button onPress={hideAction}>완료</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});

export default MarkerFilterModal;
