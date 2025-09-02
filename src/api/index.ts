import { Platform } from 'react-native';
import axios from 'axios';

const ANDROID_BASE_API_URL = 'http://localhost:3030';
const IOS_BASE_API_URL = 'http://10.0.2.3:3030';

const instance = axios.create({
  baseURL: Platform.OS === 'android' ? ANDROID_BASE_API_URL : IOS_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
