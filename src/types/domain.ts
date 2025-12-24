interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: string;
  score: number;
}

interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
  imageUris: ImageUri[];
  isFavorite?: boolean;
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

type RequestUser = {
  email: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

type RequestUpdateProfile = Pick<Profile, 'nickname' | 'imageUri'>;

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'>;
};

export type {
  ImageUri,
  Marker,
  Post,
  Profile,
  RequestUpdatePost,
  RequestUpdateProfile,
  RequestUser,
  ResponseToken,
};
