import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';

import MarkerColorInput from '@/components/MarkerColorInput';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import { MapStackParamList } from '@/types/navigation';
import { getDateWithSeparator } from '@/utils/getDate';
import CustomButton from '@/components/CustomButton';
import { validateAddPost } from '@/utils/validation';
import useImagePicker from '@/hooks/useImagePicker';
import useGetAddress from '@/hooks/useGetAddress';
import usePermission from '@/hooks/usePermission';
import InputField from '@/components/InputField';
import ScoreInput from '@/components/ScoreInput';
import ImageInput from '@/components/ImageInput';
import { colors } from '@/constants/colors';
import useForm from '@/hooks/useForm';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

const AddLocationScreen = ({ route }: Props) => {
  const { location } = route.params;
  const inset = useSafeAreaInsets();
  const address = useGetAddress(location);
  const [openDate, setOpenDate] = useState(false);
  const { handleChangeOpenPicker } = useImagePicker();

  usePermission('PHOTO');

  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });

  const handleSubmit = () => {};

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: inset.bottom + 100 },
        ]}>
        <InputField value={address} disabled />
        <CustomButton
          label={getDateWithSeparator(postForm.values.date, '. ')}
          variant="outlined"
          onPress={() => setOpenDate(true)}
        />
        <InputField
          placeholder="제목을 입력하세요."
          errorMessage={postForm.errors.title}
          touched={postForm.touched.title}
          {...postForm.getTextInputProps('title')}
        />
        <InputField
          multiline
          placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
          errorMessage={postForm.errors.description}
          touched={postForm.touched.description}
          {...postForm.getTextInputProps('description')}
        />
        <MarkerColorInput
          color={postForm.values.color}
          score={postForm.values.score}
          onChangeColor={value => postForm.onChange('color', value)}
        />
        <ScoreInput
          score={postForm.values.score}
          onChangeScore={value => postForm.onChange('score', value)}
        />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          date={postForm.values.date}
          open={openDate}
          onCancel={() => setOpenDate(false)}
          title={null}
          cancelText="취소"
          confirmText="완료"
          onConfirm={date => {
            postForm.onChange('date', date);
          }}
        />
        <ImageInput onChange={handleChangeOpenPicker} />
      </ScrollView>
      <FixedBottomCTA label="저장" onPress={handleSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
