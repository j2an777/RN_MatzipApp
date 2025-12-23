import { NavigatorScreenParams } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';

type MapStackParamList = {
  MapHome: undefined;
  AddLocation: { location: LatLng };
  SearchLocation: undefined;
};

type AuthStackParamList = {
  AuthHome: undefined;
  Login: undefined;
  Signup: undefined;
};

type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: { id: number };
  FeedFavorite: undefined;
  EditLocation: { id: number };
  ImageZoom: { id?: number; index: number };
};

type SettingStackParamList = {
  SettingHome: undefined;
  EditProfile: undefined;
};

type MainDrawerParamList = {
  Map: NavigatorScreenParams<MapStackParamList>;
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Calendar: undefined;
  Setting: undefined;
};

export type {
  MapStackParamList,
  AuthStackParamList,
  FeedStackParamList,
  MainDrawerParamList,
  SettingStackParamList,
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainDrawerParamList {}
  }
}
