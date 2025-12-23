import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import useSearchLocation from '@/hooks/useSearchLocation';
import SearchInput from '@/components/map/SearchInput';
import useUserLocation from '@/hooks/useUserLocation';

const SearchLocationScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const { userLocation } = useUserLocation();
  const res = useSearchLocation(searchKeyword, userLocation);

  const handleSubmitKeyword = () => setSearchKeyword(keyword);

  return (
    <View style={styles.constainer}>
      <SearchInput
        placeholder="검색할 장소를 입력해주세요."
        value={keyword}
        onChangeText={setKeyword}
        onSubmit={handleSubmitKeyword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
});

export default SearchLocationScreen;
