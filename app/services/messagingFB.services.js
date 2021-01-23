import messaging from '@react-native-firebase/messaging';

class MessagingFBServices {
  async requestPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      return [null, { authorized: true }];
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      return [null, { authorized: true, provisional: true }];
    } else {
      return [new Error('User has notification permissions disabled.')];
    }
  }

  getFCMToken() {
    return messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          return [null, fcmToken];
        } else {
          // user doesn't have a device token yet
          return [Error("User doesn't have a device token yet.")];
        }
      })
      .catch(err => [err]);
  }
}

export default new MessagingFBServices();
