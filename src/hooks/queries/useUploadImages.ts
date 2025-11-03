import { useMutation } from '@tanstack/react-query';

import { UseMutationCustomOptions } from '@/types/api';
import { uploadImages } from '@/api/image';

const useUploadImages = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
};

export default useUploadImages;
