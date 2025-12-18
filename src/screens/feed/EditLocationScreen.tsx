import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';

import PreviewImageList from '@/components/common/PreviewImageList';
import MarkerColorInput from '@/components/map/MarkerColorInput';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import CustomButton from '@/components/common/CustomButton';
import { FeedStackParamList } from '@/types/navigation';
import InputField from '@/components/common/InputField';
import { getDateWithSeparator } from '@/utils/getDate';
import ScoreInput from '@/components/post/ScoreInput';
import ImageInput from '@/components/post/ImageInput';
import useGetPost from '@/hooks/queries/useGetPosts';
import { validateAddPost } from '@/utils/validation';
import useImagePicker from '@/hooks/useImagePicker';
import useGetAddress from '@/hooks/useGetAddress';
import useForm from '@/hooks/useForm';

type Props = StackScreenProps<FeedStackParamList, 'EditLocation'>;

const EditLocationScreen = ({ route }: Props) => {
  const { id } = route.params;
  const inset = useSafeAreaInsets();
  const { data: post } = useGetPost(id);
  const postForm = useForm({
    initialValue: {
      title: post?.title ?? '',
      description: post?.description ?? '',
      score: post?.score ?? 3,
      date: post?.date ? new Date(post?.date) : new Date(),
      color: post?.color ?? '',
    },
    validate: validateAddPost,
  });

  const [openDate, setOpenDate] = useState(false);
  const address = useGetAddress({
    latitude: post?.latitude as number,
    longitude: post?.longitude as number,
  });
  const imagePicker = useImagePicker({ initialImages: post?.imageUris ?? [] });

  const handleSubmit = () => {
    //
  };

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
        <View style={{ flexDirection: 'row' }}>
          <ImageInput onChange={imagePicker.handleChangeOpenPicker} />
          <PreviewImageList
            imageUris={imagePicker.imageUris}
            onDelete={imagePicker.deleteImageUri}
          />
        </View>
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

export default EditLocationScreen;
