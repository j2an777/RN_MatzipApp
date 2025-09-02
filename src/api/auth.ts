import { getEncryptStorage } from '@/utils/encryptStorage';
import { Profile } from '@/types/domain';

import instance from '.';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  await instance.post('/auth/signup', { email, password });
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const { data } = await instance.post('/auth/signin', { email, password });
  return data;
};

const getProfile = async (): Promise<Profile> => {
  const { data } = await instance.get('/auth/me');
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const { data } = await instance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await instance.post('/auth/logout');
};

export { postLogin, postSignup, getProfile, getAccessToken, logout };
