import WebView, { WebViewNavigation } from 'react-native-webview';
import { SafeAreaView, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { useState } from 'react';
import axios from 'axios';

import Indicator from '@/components/common/Indicator';
import useAuth from '@/hooks/queries/useAuth';

const REDIRECT_URI = `http://localhost:3030/auth/oauth/kakao`;

const KakaoLoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { kakaoLoginMutation } = useAuth();

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    kakaoLoginMutation.mutate(response.data.access_token);
  };

  const handleShouldStartLoadWithRequest = (e: WebViewNavigation) => {
    const isMatched = e.url.includes(`${REDIRECT_URI}?code=`);

    if (isMatched) {
      const code = e.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(code);
      setIsLoading(e.loading);
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Indicator size="large" />}
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KakaoLoginScreen;
