import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';
import { useEffect } from 'react';

const usePermission = async () => {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const checked = await check(permissionOS);

      const showPermissionAllert = () => {
        Alert.alert(
          '위치 권한 허용이 필요합니다.',
          '설정 화면에서 위치 권한을 허용해주세요.',
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
          await request(permissionOS);
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
