import instance from '@/api';

const setHeader = (key: string, value: string) => {
  instance.defaults.headers.common[key] = value;
};

const removeHeader = (key: string) => {
  if (!instance.defaults.headers.common[key]) {
    return;
  }
  delete instance.defaults.headers.common[key];
};

export { setHeader, removeHeader };
