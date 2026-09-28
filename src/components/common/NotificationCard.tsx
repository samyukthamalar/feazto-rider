/**
 * FEAzTO Rider Design System - NotificationCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 10 & 37
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { RiderNotification } from '../../services/notifications';
import { Card } from './Card';
import { Pill } from './Pill';

interface NotificationCardProps {
  notification: RiderNotification;
  onPress?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const getCategoryTone = () => {
    switch (notification.category) {
      case 'WEATHER':
      case 'INCENTIVE':
        return 'yellow';
      case 'PAYOUT':
        return 'green';
      case 'SAFETY':
        return 'danger';
      case 'ORDER':
      default:
        return 'neutral';
    }
  };

  return (
    <Card
      style={[styles.card, !notification.read && styles.cardUnread]}
      variant="surface"
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <View style={styles.categoryRow}>
          {!notification.read && <View style={styles.unreadDot} />}
          <Pill label={notification.category} tone={getCategoryTone()} />
        </View>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>

      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.body}>{notification.body}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardUnread: {
    borderColor: colors.borderLight,
    backgroundColor: colors.secondarySurface,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brandYellow,
  },
  timestamp: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
  },
  title: {
    ...typography.subtitle2,
    color: colors.textPrimary,
    marginTop: 2,
  },
  body: {
    ...typography.body2,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
});
