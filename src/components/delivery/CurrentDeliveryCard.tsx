/**
 * FEAzTO Rider - Current Active Delivery Card
 * Source of truth: FEAzTO Rider Master Prompt Section 15 & 26-27
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { pendingMockOffer, useOrderStore } from '../../store/orderStore';
import { useRiderStore } from '../../store/riderStore';
import { useUIStore } from '../../store/uiStore';
import { Card } from '../common/Card';
import { Pill } from '../common/Pill';
import { PrimaryButton } from '../common/PrimaryButton';
import { StatusBadge } from '../common/StatusBadge';

export const CurrentDeliveryCard: React.FC = () => {
  const router = useRouter();
  const activeOrder = useOrderStore((state) => state.activeOrder);
  const currentStage = useOrderStore((state) => state.currentStage);
  const setPendingOffer = useOrderStore((state) => state.setPendingOffer);
  const riderStatus = useRiderStore((state) => state.status);
  const showToast = useUIStore((state) => state.showToast);

  const isOffline = riderStatus === 'OFFLINE';

  if (isOffline) {
    return (
      <Card style={styles.card} variant="surface">
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>⏸️</Text>
          <Text style={styles.emptyTitle}>You Are Currently Offline</Text>
          <Text style={styles.emptySubtitle}>
            Go online using the switch above to start receiving instant delivery orders in your zone.
          </Text>
        </View>
      </Card>
    );
  }

  if (!activeOrder) {
    return (
      <Card style={styles.card} variant="surface">
        <View style={styles.radarContainer}>
          <View style={styles.pulseRadar}>
            <Text style={styles.radarIcon}>📡</Text>
          </View>
          <Text style={styles.radarTitle}>Searching for Nearby Dispatches</Text>
          <Text style={styles.radarSubtitle}>
            Stay within 3 km of partner cloud kitchens for high offer allocation.
          </Text>

          <TouchableOpacity
            style={styles.simulateOfferBtn}
            onPress={() => {
              setPendingOffer(pendingMockOffer);
              showToast('New dispatch offer incoming (#FA2842)!', 'success');
              router.push('/delivery');
            }}
          >
            <Text style={styles.simulateOfferText}>+ Dispatch Sample Order (#FA2842)</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  const getStageDisplay = () => {
    switch (currentStage) {
      case 'NAVIGATING_TO_KITCHEN':
        return { label: 'To Kitchen', nextAction: 'Arrived at Kitchen', distance: `${activeOrder.pickupDistanceKm} km` };
      case 'ARRIVED_AT_KITCHEN':
        return { label: 'At Kitchen', nextAction: 'Confirm Pickup', distance: '0 km' };
      case 'PICKING_UP':
        return { label: 'Verifying Order', nextAction: 'Depart with Order', distance: `${activeOrder.deliveryDistanceKm} km` };
      case 'NAVIGATING_TO_CUSTOMER':
        return { label: 'To Customer', nextAction: 'Arrived at Drop', distance: `${activeOrder.deliveryDistanceKm} km` };
      case 'ARRIVED_AT_CUSTOMER':
        return { label: 'At Customer', nextAction: 'Verify & Handover', distance: '0 km' };
      case 'VERIFYING_DELIVERY':
        return { label: 'Handover & OTP', nextAction: 'Complete Delivery', distance: '0 km' };
      default:
        return { label: 'In Transit', nextAction: 'Open Route Management', distance: `${activeOrder.deliveryDistanceKm} km` };
    }
  };

  const stage = getStageDisplay();

  return (
    <Card
      style={styles.card}
      variant="highlight"
      onPress={() => router.push('/delivery')}
    >
      <View style={styles.headerRow}>
        <View style={styles.idBadge}>
          <Text style={styles.orderId}>{activeOrder.id}</Text>
          <Pill label={`${activeOrder.itemCount} items`} tone="neutral" />
          {activeOrder.earnings.rainBonus > 0 && (
            <Pill label={`+₹${activeOrder.earnings.rainBonus} Rain`} tone="yellow" />
          )}
        </View>
        <StatusBadge label={stage.label} variant="on_delivery" size="sm" pulse />
      </View>

      {/* Route points */}
      <View style={styles.routeContainer}>
        {/* Kitchen info */}
        <View style={styles.pointRow}>
          <View style={[styles.dot, styles.dotKitchen]} />
          <View style={styles.pointText}>
            <Text style={styles.pointTitle}>{activeOrder.kitchenName}</Text>
            <Text style={styles.pointAddress} numberOfLines={1}>
              {activeOrder.kitchenAddress}
            </Text>
          </View>
          <Text style={styles.pointDistance}>{activeOrder.pickupDistanceKm} km</Text>
        </View>

        <View style={styles.connector} />

        {/* Customer info */}
        <View style={styles.pointRow}>
          <View style={[styles.dot, styles.dotCustomer]} />
          <View style={styles.pointText}>
            <Text style={styles.pointTitle}>{activeOrder.customer.name}</Text>
            <Text style={styles.pointAddress} numberOfLines={1}>
              {activeOrder.customer.address}
            </Text>
          </View>
          <Text style={styles.pointDistance}>{activeOrder.deliveryDistanceKm} km</Text>
        </View>
      </View>

      {/* Footer & CTA */}
      <View style={styles.footerRow}>
        <View>
          <Text style={styles.earningLabel}>Guaranteed Net Earning</Text>
          <Text style={styles.earningValue}>₹{activeOrder.earnings.totalEarning}</Text>
        </View>

        <PrimaryButton
          title={stage.nextAction}
          onPress={() => router.push('/delivery')}
          style={styles.ctaButton}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  idBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    flexWrap: 'wrap',
    marginRight: spacing.sm,
  },
  orderId: {
    ...typography.subtitle1,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  routeContainer: {
    paddingVertical: spacing.md,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
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
  connector: {
    width: 2,
    height: 14,
    backgroundColor: colors.borderLight,
    marginLeft: 3,
    marginVertical: 2,
  },
  pointText: {
    flex: 1,
  },
  pointTitle: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  pointAddress: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 1,
  },
  pointDistance: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  earningLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  earningValue: {
    ...typography.h3,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  ctaButton: {
    height: 38,
    minHeight: 38,
    paddingHorizontal: spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  emptySubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    maxWidth: 280,
  },
  radarContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  pulseRadar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  radarIcon: {
    fontSize: 20,
  },
  radarTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
  },
  radarSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    maxWidth: 260,
  },
  simulateOfferBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.brandYellow,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
  },
  simulateOfferText: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '700',
  },
});
