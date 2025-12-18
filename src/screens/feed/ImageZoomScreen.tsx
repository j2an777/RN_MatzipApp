import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import ImageCarousel from '@/components/common/ImageCarousel';
import { FeedStackParamList } from '@/types/navigation';
import useGetPost from '@/hooks/queries/useGetPosts';

type Props = StackScreenProps<FeedStackParamList, 'ImageZoom'>;

const ImageZoomScreen = ({ route }: Props) => {
  const { id, index } = route.params;
  const { data: post } = useGetPost(id as number);

  return <ImageCarousel images={post?.imageUris ?? []} pressedIndex={index} />;
};

const styles = StyleSheet.create({});

export default ImageZoomScreen;
