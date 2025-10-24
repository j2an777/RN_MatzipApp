import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet } from 'react-native';

import { MapStackParamList } from '@/types/navigation';
import CustomButton from '@/components/CustomButton';
import { validateAddPost } from '@/utils/validation';
import useGetAddress from '@/hooks/useGetAddress';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { getDateWithSeparator } from '@/utils/getDate';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

const AddLocationScreen = ({ route }: Props) => {
  const { location } = route.params;
  const address = useGetAddress(location);
  const [openDate, setOpenDate] = useState(false);

  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
    },
    validate: validateAddPost,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
