// utils/notifications/notificationConfig.ts
import * as Notifications from 'expo-notifications';

export async function createNotificationChannel() {
  await Notifications.setNotificationChannelAsync('daily-reminders', {
    name: 'Daily Reminders',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

export async function configureNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Bạn cần cấp quyền thông báo!');
    return;
  }

  await createNotificationChannel();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}
