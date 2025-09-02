import { useMutation, useQuery } from '@tanstack/react-query';

import { getAccessToken, postLogin, postSignup } from '@/api/auth';
import {
  removeEncryptStorage,
  setEncryptStorage,
} from '@/utils/encryptStorage';
import { UseMutationCustomOptions } from '@/types/api';
import { numbers } from '@/constants/numbers';
import { removeHeader, setHeader } from '@/utils/header';
import { useEffect } from 'react';

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
};

export { useSignup, useLogin, useGetRefreshToken };
