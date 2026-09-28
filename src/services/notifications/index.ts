/**
 * FEAzTO Rider - Notification Service Contract & Mock Implementation
 * Section 37 Source of Truth
 */

export interface RiderNotification {
  id: string;
  title: string;
  body: string;
  category: 'ORDER' | 'WEATHER' | 'INCENTIVE' | 'SAFETY' | 'PAYOUT';
  timestamp: string;
  read: boolean;
}

export interface NotificationService {
  getNotifications(): Promise<RiderNotification[]>;
  markAsRead(id: string): Promise<void>;
}

export class MockNotificationService implements NotificationService {
  async getNotifications(): Promise<RiderNotification[]> {
    return [
      {
        id: 'notif-1',
        title: 'Rain Surge Active (+₹30)',
        body: 'Heavy rainfall reported in your delivery zone. Extra ₹30 added to current deliveries.',
        category: 'WEATHER',
        timestamp: '10m ago',
        read: false,
      },
      {
        id: 'notif-2',
        title: 'Dinner Slot Reminder',
        body: 'Your booked slot starts at 17:00. Please complete helmet check beforehand.',
        category: 'SAFETY',
        timestamp: '1h ago',
        read: true,
      },
    ];
  }

  async markAsRead(_id: string): Promise<void> {}
}

export const notificationService: NotificationService = new MockNotificationService();
