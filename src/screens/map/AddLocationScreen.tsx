import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet } from 'react-native';

import { MapStackParamList } from '@/types/navigation';
import CustomButton from '@/components/CustomButton';
import { validateAddPost } from '@/utils/validation';
import useGetAddress from '@/hooks/useGetAddress';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

const AddLocationScreen = ({ route }: Props) => {
  const { location } = route.params;
  const address = useGetAddress(location);

  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField value={address} />
      <CustomButton label="날짜 선택" variant="outlined" />
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
