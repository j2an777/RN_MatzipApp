import ImageCropPicker from 'react-native-image-crop-picker';
import { useState } from 'react';

import getFormDataImages from '@/utils/getFormDataImages';
import { ImageUri } from '@/types/domain';

import useUploadImages from './queries/useUploadImages';

const useImagePicker = () => {
  const { mutate } = useUploadImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>([]);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({ uri }))]);
  };

  const handleChangeOpenPicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    }).then(images => {
      const formData = getFormDataImages('images', images);
      mutate(formData, {
        onSuccess: data => addImageUris(data),
      });
    });
  };

  return { handleChangeOpenPicker, imageUris };
};

export default useImagePicker;
