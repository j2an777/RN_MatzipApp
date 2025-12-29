import {
  Profile,
  RequestUpdateProfile,
  RequestUser,
  ResponseToken,
} from '@/types/domain';
import { getEncryptStorage } from '@/utils/encryptStorage';

import instance from '.';

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  await instance.post('/auth/signup', { email, password });
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const { data } = await instance.post('/auth/signin', { email, password });
  return data;
};

const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const { data } = await instance.post('/auth/oauth/kakao', { token });

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

const editProfile = async (body: RequestUpdateProfile): Promise<Profile> => {
  const { data } = await instance.patch('/auth/me', body);

  return data;
};

export {
  postLogin,
  postSignup,
  getProfile,
  getAccessToken,
  logout,
  editProfile,
  kakaoLogin,
};
