import instance from '.';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const { data } = await instance.post('/images', body, {
    headers: {
      'Content-Type': 'multi-part/formdata',
    },
  });

  return data;
};

export { uploadImages };
