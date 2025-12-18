import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { useState } from 'react';

import getFormDataImages from '@/utils/getFormDataImages';
import { ImageUri } from '@/types/domain';

import useUploadImages from './queries/useUploadImages';

const useImagePicker = ({ initialImages }: { initialImages: ImageUri[] }) => {
  const { mutate } = useUploadImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({ uri }))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const handleChangeOpenPicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    })
      .then(images => {
        const formData = getFormDataImages('images', images);
        mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(e => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
        }
      });
  };

  return { handleChangeOpenPicker, imageUris, deleteImageUri };
};

export default useImagePicker;
