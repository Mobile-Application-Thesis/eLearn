import { FirebaseService } from './firebase.services';

class DeviceFBServices {
  devicesCollection = 'devices';

  addUserDeviceFCMToken = async (fcmToken = null) => {
    if (!fcmToken) {
      return [Error('Please specify a FCM Token to be stored')];
    }

    const [error, existingDevices] = await FirebaseService.getFBCollectionWhere(
      {
        parentCollection: this.devicesCollection,
        key: 'fcmToken',
        value: fcmToken,
      },
    )
      .where('user', '==', FirebaseService.auth.currentUser.uid)
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        return [null, data];
      })
      .catch(err => [err]);

    if (error) {
      return [error];
    }

    if (existingDevices?.length > 0) {
      const [userDevice] = existingDevices;

      if (!userDevice.active) {
        // Activate user device
        return FirebaseService.updateMultipleFBDoc({
          parentCollection: this.devicesCollection,
          parentDoc: userDevice.id,
          docs: {
            active: true,
          },
        });
      }

      return [null];
    }

    return FirebaseService.addFBDoc({
      parentCollection: this.devicesCollection,
      docData: {
        fcmToken,
        active: true,
        user: FirebaseService.auth.currentUser.uid,
      },
    });
  };

  deactivateUserDevice = async (fcmToken = null) => {
    if (!fcmToken) {
      return [Error('Please specify a FCM Token.')];
    }

    const [error, existingDevices] = await FirebaseService.getFBCollectionWhere(
      {
        parentCollection: this.devicesCollection,
        key: 'fcmToken',
        value: fcmToken,
      },
    )
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        return [null, data];
      })
      .catch(err => [err]);

    if (error) {
      return [error];
    }

    if (existingDevices?.length > 0) {
      const [userDevice] = existingDevices;

      if (userDevice.active) {
        // Deactivate user device
        return FirebaseService.updateMultipleFBDoc({
          parentCollection: this.devicesCollection,
          parentDoc: userDevice.id,
          docs: {
            active: false,
          },
        })
          .then(() => [null])
          .catch(err => [err]);
      }
    }

    return [null];
  };
}

export default new DeviceFBServices();
