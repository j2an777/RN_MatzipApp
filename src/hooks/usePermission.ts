import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';
import { useEffect } from 'react';

import { alerts } from '@/constants/messages';

type PermissionType = 'LOCATION' | 'PHOTO';

const androidPermissions = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.MEDIA_LIBRARY,
};

const usePermission = async (type: PermissionType) => {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermissions : iosPermissions;

      const checked = await check(permissionOS[type]);

      const showPermissionAllert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            { text: '설정하기', onPress: () => Linking.openSettings() },
            { text: '취소', style: 'cancel' },
          ],
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAllert();
            return;
          }
          await request(permissionOS[type]);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAllert();
          break;
      }
    })();
  }, []);
};

export default usePermission;
