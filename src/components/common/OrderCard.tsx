/**
 * FEAzTO Rider Design System - OrderCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 5, 6, 10, 11
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { CanonicalOrder, OrderStatus } from '../../types/order';
import { Card } from './Card';
import { Pill } from './Pill';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { StatusBadge, StatusVariant } from './StatusBadge';

interface OrderCardProps {
  order: CanonicalOrder;
  onActionPress?: () => void;
  actionTitle?: string;
  onSecondaryPress?: () => void;
  secondaryTitle?: string;
  isCompact?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onActionPress,
  actionTitle,
  onSecondaryPress,
  secondaryTitle,
  isCompact = false,
}) => {
  const getStatusVariant = (status: OrderStatus): StatusVariant => {
    switch (status) {
      case 'DELIVERED':
      case 'CLOSED':
        return 'approved';
      case 'RIDER_ASSIGNED':
      case 'PLACED':
        return 'pending';
      case 'OUT_FOR_DELIVERY':
      case 'RIDER_ACCEPTED':
      case 'RIDER_AT_KITCHEN':
      case 'PICKED_UP':
      case 'RIDER_AT_CUSTOMER':
      case 'DELIVERY_VERIFIED':
        return 'on_delivery';
      default:
        return 'offline';
    }
  };

  return (
    <Card style={styles.card} variant={order.status === 'OUT_FOR_DELIVERY' ? 'highlight' : 'surface'}>
      {/* Header with Order ID and Status */}
      <View style={styles.header}>
        <View style={styles.idContainer}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Pill label={`${order.itemCount} items`} tone="neutral" />
          {order.earnings.rainBonus > 0 && (
            <Pill label={`+₹${order.earnings.rainBonus} Rain`} tone="yellow" />
          )}
        </View>
        <StatusBadge
          label={order.status.replace(/_/g, ' ')}
          variant={getStatusVariant(order.status)}
          size="sm"
          pulse={order.status === 'OUT_FOR_DELIVERY' || order.status === 'RIDER_ACCEPTED'}
        />
      </View>

      {/* Route Info */}
      <View style={styles.routeContainer}>
        {/* Kitchen (Pickup) */}
        <View style={styles.stopRow}>
          <View style={[styles.stopDot, styles.dotKitchen]} />
          <View style={styles.stopDetails}>
            <Text style={styles.stopName} numberOfLines={1}>{order.kitchenName}</Text>
            <Text style={styles.stopAddress} numberOfLines={1}>{order.kitchenAddress}</Text>
          </View>
          <Text style={styles.stopDistance}>{order.pickupDistanceKm} km</Text>
        </View>

        <View style={styles.stopLine} />

        {/* Customer (Drop) */}
        <View style={styles.stopRow}>
          <View style={[styles.stopDot, styles.dotCustomer]} />
          <View style={styles.stopDetails}>
            <Text style={styles.stopName} numberOfLines={1}>{order.customer.name}</Text>
            <Text style={styles.stopAddress} numberOfLines={1}>{order.customer.address}</Text>
          </View>
          <Text style={styles.stopDistance}>{order.deliveryDistanceKm} km</Text>
        </View>
      </View>

      {/* Earnings & Actions */}
      <View style={styles.footer}>
        <View style={styles.earningsCol}>
          <Text style={styles.earningsLabel}>Earning Potential</Text>
          <Text style={styles.earningsValue}>₹{order.earnings.totalEarning}</Text>
        </View>

        <View style={styles.actionsCol}>
          {secondaryTitle && onSecondaryPress && (
            <SecondaryButton
              title={secondaryTitle}
              onPress={onSecondaryPress}
              variant="outline"
              style={styles.actionBtn}
            />
          )}
          {actionTitle && onActionPress && (
            <PrimaryButton
              title={actionTitle}
              onPress={onActionPress}
              style={styles.actionBtn}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    flexWrap: 'wrap',
  },
  orderId: {
    ...typography.subtitle1,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  routeContainer: {
    paddingVertical: spacing.md,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stopDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotKitchen: {
    backgroundColor: colors.brandYellow,
  },
  dotCustomer: {
    backgroundColor: colors.success,
  },
  stopLine: {
    width: 2,
    height: 14,
    backgroundColor: colors.borderLight,
    marginLeft: 3,
    marginVertical: 2,
  },
  stopDetails: {
    flex: 1,
  },
  stopName: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  stopAddress: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  stopDistance: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  earningsCol: {
    justifyContent: 'center',
  },
  earningsLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  earningsValue: {
    ...typography.h3,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  actionsCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionBtn: {
    height: 38,
    minHeight: 38,
    paddingHorizontal: spacing.md,
  },
});
