/**
 * FEAzTO Rider - Developer Demo Control Panel
 * Source of truth: FEAzTO Rider Master Prompt Section 33
 * Guarded by __DEV__ / dev environment checks.
 */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useAuthStore } from '../../store/authStore';
import { useIncentiveStore } from '../../store/incentiveStore';
import { canonicalMockOrder, pendingMockOffer, useOrderStore } from '../../store/orderStore';
import { useRiderStore } from '../../store/riderStore';
import { useUIStore } from '../../store/uiStore';
import { WeatherState } from '../../types/incentive';
import { OrderStatus } from '../../types/order';
import { RiderStatus, VerificationStatus } from '../../types/rider';
import { BottomSheetModal } from './BottomSheetModal';

export const DemoControlPanel: React.FC = () => {
  const isDemoDrawerOpen = useUIStore((state) => state.isDemoDrawerOpen);
  const setDemoDrawerOpen = useUIStore((state) => state.setDemoDrawerOpen);
  const showToast = useUIStore((state) => state.showToast);

  // Rider state
  const riderStatus = useRiderStore((state) => state.status);
  const setRiderStatus = useRiderStore((state) => state.setStatus);
  const verificationStatus = useRiderStore((state) => state.profile.verificationStatus);
  const setVerificationStatus = useRiderStore((state) => state.setVerificationStatus);
  const setAuthVerification = useAuthStore((state) => state.setVerificationStatus);

  // Weather state
  const weather = useIncentiveStore((state) => state.weather);
  const setWeatherState = useIncentiveStore((state) => state.setWeatherState);

  // Order state
  const activeOrder = useOrderStore((state) => state.activeOrder);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const setPendingOffer = useOrderStore((state) => state.setPendingOffer);
  const resetOrders = useOrderStore((state) => state.resetOrders);

  const handleSetRiderStatus = (status: RiderStatus) => {
    setRiderStatus(status);
    showToast(`Rider status set to: ${status}`, 'info');
  };

  const handleSetVerification = (status: VerificationStatus) => {
    setVerificationStatus(status);
    setAuthVerification(status);
    showToast(`Verification status set to: ${status}`, 'info');
  };

  const handleSetWeather = (state: WeatherState) => {
    setWeatherState(state);
    showToast(`Weather set to: ${state}`, 'info');
  };

  const handleSimulateNewOffer = () => {
    setPendingOffer(pendingMockOffer);
    showToast('New Delivery Offer Dispatched (#FA2842)', 'success');
    setDemoDrawerOpen(false);
  };

  const handleSetOrderStatus = (status: OrderStatus) => {
    if (!activeOrder) {
      useOrderStore.setState({ activeOrder: canonicalMockOrder });
    }
    updateOrderStatus(status);
    showToast(`Order status set to: ${status}`, 'info');
  };

  const handleResetEverything = () => {
    useRiderStore.getState().resetRiderState();
    useIncentiveStore.getState().resetIncentives();
    resetOrders();
    showToast('Demo environment reset to baseline', 'success');
  };

  return (
    <BottomSheetModal
      visible={isDemoDrawerOpen}
      onClose={() => setDemoDrawerOpen(false)}
      title="🛠️ Developer Demo Control Panel"
    >
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.disclaimer}>
          Simulate real-time events, dispatch offers, safety gates & weather without backend.
        </Text>

        {/* 1. Rider Status */}
        <Text style={styles.sectionTitle}>Rider Status</Text>
        <View style={styles.buttonRow}>
          {(['OFFLINE', 'ONLINE', 'ON_DELIVERY', 'ON_BREAK'] as RiderStatus[]).map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.chip, riderStatus === s && styles.chipActive]}
              onPress={() => handleSetRiderStatus(s)}
            >
              <Text style={[styles.chipText, riderStatus === s && styles.chipTextActive]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2. Verification Status */}
        <Text style={styles.sectionTitle}>Verification Status</Text>
        <View style={styles.buttonRow}>
          {(['PENDING', 'APPROVED', 'NEEDS_CORRECTION'] as VerificationStatus[]).map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.chip, verificationStatus === v && styles.chipActive]}
              onPress={() => handleSetVerification(v)}
            >
              <Text style={[styles.chipText, verificationStatus === v && styles.chipTextActive]}>
                {v}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. Weather Simulation */}
        <Text style={styles.sectionTitle}>Weather & Surge Conditions</Text>
        <View style={styles.buttonRow}>
          {(['NORMAL', 'RAIN', 'HEAVY_RAIN', 'HEAT', 'STORM_ALERT'] as WeatherState[]).map((w) => (
            <TouchableOpacity
              key={w}
              style={[styles.chip, weather.state === w && styles.chipActive]}
              onPress={() => handleSetWeather(w)}
            >
              <Text style={[styles.chipText, weather.state === w && styles.chipTextActive]}>
                {w}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Order Lifecycle */}
        <Text style={styles.sectionTitle}>Order State Simulation</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.chip, styles.chipAccent]}
            onPress={handleSimulateNewOffer}
          >
            <Text style={styles.chipTextAccent}>+ Trigger New Offer</Text>
          </TouchableOpacity>

          {(['RIDER_ACCEPTED', 'RIDER_AT_KITCHEN', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'] as OrderStatus[]).map((st) => (
            <TouchableOpacity
              key={st}
              style={[styles.chip, activeOrder?.status === st && styles.chipActive]}
              onPress={() => handleSetOrderStatus(st)}
            >
              <Text style={[styles.chipText, activeOrder?.status === st && styles.chipTextActive]}>
                {st}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 5. Reset Action */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetEverything}
        >
          <Text style={styles.resetText}>🔄 Reset All Demo State to Default</Text>
        </TouchableOpacity>
      </ScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 460,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.subtitle2,
    color: colors.brandYellow,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
    marginBottom: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.md,
  },
  chipActive: {
    backgroundColor: colors.brandYellowSoft,
    borderColor: colors.brandYellow,
  },
  chipAccent: {
    borderColor: colors.brandYellow,
    backgroundColor: 'rgba(245, 183, 0, 0.2)',
  },
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.brandYellow,
    fontWeight: '700',
  },
  chipTextAccent: {
    ...typography.caption,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  resetButton: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  resetText: {
    ...typography.button,
    color: colors.danger,
    fontSize: 13,
  },
});
