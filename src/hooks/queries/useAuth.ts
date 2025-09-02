import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  removeEncryptStorage,
  setEncryptStorage,
} from '@/utils/encryptStorage';
import { getAccessToken, getProfile, postLogin, postSignup } from '@/api/auth';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/api';
import { removeHeader, setHeader } from '@/utils/header';
import { numbers } from '@/constants/numbers';
import { Profile } from '@/types/domain';

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
};

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage('refreshToken', refreshToken);
    },
    ...mutationOptions,
  });
};

const useGetRefreshToken = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    if (!isSuccess || !data) {
      return;
    }

    (async () => {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      await setEncryptStorage('refreshToken', data.refreshToken);
    })();
  }, [isSuccess, data]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptStorage('refreshToken');
      }
    })();
  }, [isError]);

  return { isSuccess, isError };
};

const useGetProfile = (queryOptions?: UseQueryCustomOptions<Profile>) => {
  return useQuery({
    queryFn: getProfile,
    queryKey: ['auth', 'getProfile'],
    ...queryOptions,
  });
};

export { useSignup, useLogin, useGetRefreshToken, useGetProfile };
