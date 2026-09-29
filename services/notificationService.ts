/**
 * FEAzTO Rider - Notification Service Abstraction
 */

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'incentive' | 'system' | 'safety';
}

const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Order Completed ✓',
    message: 'Order #2FS28734 delivered successfully. ₹82 credited to wallet.',
    time: '2 mins ago',
    read: false,
    type: 'order',
  },
  {
    id: 'notif-2',
    title: 'Peak Surge Active (+₹15)',
    message: 'High demand in Guindy Industrial Estate area until 4:00 PM.',
    time: '25 mins ago',
    read: true,
    type: 'incentive',
  },
  {
    id: 'notif-3',
    title: 'Daily Payout Processed',
    message: '₹1,250 transferred to linked account rider@okhdfcbank.',
    time: 'Yesterday',
    read: true,
    type: 'system',
  },
];

export const notificationService = {
  async getNotifications(): Promise<AppNotification[]> {
    return mockNotifications;
  },

  async markAsRead(id: string): Promise<void> {
    const notif = mockNotifications.find((n) => n.id === id);
    if (notif) notif.read = true;
  },
};
