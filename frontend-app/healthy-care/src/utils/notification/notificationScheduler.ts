import * as Notifications from 'expo-notifications';
import { NotificationRequestInput, CalendarTriggerInput } from 'expo-notifications';

export async function scheduleDailyNotification(
  hour: number,
  minute: number,
  title: string,
  body: string
) {
 const trigger = {
    type: Notifications.SchedulableTriggerInputTypes.DAILY,
    hour,
    minute,
    channelId: 'daily-reminders', // Bắt buộc cho Android 8+
  } as const;

  
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger,
  });
}

/**
 * Lên lịch nhiều thông báo trong ngày tại các mốc giờ khác nhau
 */
export async function scheduleMultipleDailyNotifications(
    times: { hour: number; minute: number }[],
    title: string,
    body: string
  ) {
    for (const time of times) {
      await scheduleDailyNotification(time.hour, time.minute, title, body);
    }
}