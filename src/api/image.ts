import instance from '.';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const { data } = await instance.post('/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export { uploadImages };
