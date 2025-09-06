import { Platform } from 'react-native';
import axios from 'axios';

export const baseUrls = {
  android: 'http://10.0.2.2:3030',
  ios: 'http://localhost:3030',
};

const instance = axios.create({
  baseURL: Platform.OS === 'android' ? baseUrls.android : baseUrls.ios,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
