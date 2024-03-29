import React from 'react';

const requestPushNotificationPermission = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  /*
registerForPushNotificationsAsync = async () => {
if (Device.isDevice) {
const { status: existingStatus } = await Notifications.getPermissionsAsync();
let finalStatus = existingStatus;
if (existingStatus !== 'granted') {
  const { status } = await Notifications.requestPermissionsAsync();
  finalStatus = status;
}
if (finalStatus !== 'granted') {
  alert('Failed to get push token for push notification!');
  return;
}
const token = (await Notifications.getExpoPushTokenAsync()).data;
console.log(token);
this.setState({ expoPushToken: token });
} else {
alert('Must use physical device for Push Notifications');
}

if (Platform.OS === 'android') {
Notifications.setNotificationChannelAsync('default', {
  name: 'default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#FF231F7C',
});
}
};
*/
};

export default requestPushNotificationPermission;
