import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import {
  removeEncryptStorage,
  setEncryptStorage,
} from '@/utils/encryptStorage';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/api';
import { queryKeys, storageKeys } from '@/constants/keys';
import { removeHeader, setHeader } from '@/utils/header';
import { Profile, ResponseToken } from '@/types/domain';
import { numbers } from '@/constants/numbers';
import queryClient from '@/api/queryClient';

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
};

const useLogin = <T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader(queryKeys.AUTHORIZATION, `Bearer ${accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
};

const useEmailLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useLogin(postLogin, mutationOptions);
};

const useKakaoLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useLogin(kakaoLogin, mutationOptions);
};

const useGetRefreshToken = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    if (!isSuccess || !data) {
      return;
    }

    (async () => {
      setHeader(queryKeys.AUTHORIZATION, `Bearer ${data.accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    })();
  }, [isSuccess, data]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader(queryKeys.AUTHORIZATION);
        await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      }
    })();
  }, [isError]);

  return { isSuccess, isError };
};

const useGetProfile = (queryOptions?: UseQueryCustomOptions<Profile>) => {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
};

const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader(queryKeys.AUTHORIZATION);
      await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
};

const useUpdateProfile = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const { data, isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });

  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();

  return {
    auth: {
      id: data?.id || '',
      nickname: data?.nickname || '',
      email: data?.email || '',
      imageUri: data?.imageUri || '',
    },
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    isLogin,
    logoutMutation,
    profileMutation,
  };
};

export default useAuth;
