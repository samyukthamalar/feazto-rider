/**
 * FEAzTO Rider - Standalone Developer Demo Route
 * Source of truth: FEAzTO Rider Master Prompt Section 33
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../src/components/common/Card';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { SecondaryButton } from '../src/components/common/SecondaryButton';
import { Header } from '../src/components/navigation/Header';
import { colors } from '../src/constants/colors';
import { borderRadius, spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useAuthStore } from '../src/store/authStore';
import { useIncentiveStore } from '../src/store/incentiveStore';
import { canonicalMockOrder, pendingMockOffer, useOrderStore } from '../src/store/orderStore';
import { useRiderStore } from '../src/store/riderStore';
import { useUIStore } from '../src/store/uiStore';
import { WeatherState } from '../src/types/incentive';
import { OrderStatus } from '../src/types/order';
import { RiderStatus, VerificationStatus } from '../src/types/rider';

export default function DemoScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);

  const riderStatus = useRiderStore((state) => state.status);
  const setRiderStatus = useRiderStore((state) => state.setStatus);
  const verificationStatus = useRiderStore((state) => state.profile.verificationStatus);
  const setVerificationStatus = useRiderStore((state) => state.setVerificationStatus);
  const setAuthVerification = useAuthStore((state) => state.setVerificationStatus);

  const weather = useIncentiveStore((state) => state.weather);
  const setWeatherState = useIncentiveStore((state) => state.setWeatherState);

  const activeOrder = useOrderStore((state) => state.activeOrder);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const setPendingOffer = useOrderStore((state) => state.setPendingOffer);
  const resetOrders = useOrderStore((state) => state.resetOrders);

  const handleSimulateNewOffer = () => {
    setPendingOffer(pendingMockOffer);
    showToast('New Delivery Offer Dispatched (#FA2842)', 'success');
    router.push('/delivery');
  };

  const handleReset = () => {
    useRiderStore.getState().resetRiderState();
    useIncentiveStore.getState().resetIncentives();
    resetOrders();
    showToast('Demo environment reset to initial baseline', 'success');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Developer Demo Hub" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Text style={styles.sectionHeader}>Rider Operational Status</Text>
          <View style={styles.chipRow}>
            {(['OFFLINE', 'ONLINE', 'ON_DELIVERY', 'ON_BREAK'] as RiderStatus[]).map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.chip, riderStatus === s && styles.chipActive]}
                onPress={() => {
                  setRiderStatus(s);
                  showToast(`Rider: ${s}`, 'info');
                }}
              >
                <Text style={[styles.chipText, riderStatus === s && styles.chipTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionHeader}>Verification Clearance</Text>
          <View style={styles.chipRow}>
            {(['PENDING', 'APPROVED', 'NEEDS_CORRECTION'] as VerificationStatus[]).map((v) => (
              <TouchableOpacity
                key={v}
                style={[styles.chip, verificationStatus === v && styles.chipActive]}
                onPress={() => {
                  setVerificationStatus(v);
                  setAuthVerification(v);
                  showToast(`Verification: ${v}`, 'info');
                }}
              >
                <Text style={[styles.chipText, verificationStatus === v && styles.chipTextActive]}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionHeader}>Weather & Monsoon Surge</Text>
          <View style={styles.chipRow}>
            {(['NORMAL', 'RAIN', 'HEAVY_RAIN', 'HEAT', 'STORM_ALERT'] as WeatherState[]).map((w) => (
              <TouchableOpacity
                key={w}
                style={[styles.chip, weather.state === w && styles.chipActive]}
                onPress={() => {
                  setWeatherState(w);
                  showToast(`Weather: ${w}`, 'info');
                }}
              >
                <Text style={[styles.chipText, weather.state === w && styles.chipTextActive]}>{w}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionHeader}>Order State Machine</Text>
          <PrimaryButton
            title="+ Trigger Incoming Delivery Offer"
            onPress={handleSimulateNewOffer}
            style={styles.offerBtn}
          />

          <View style={styles.chipRow}>
            {(['RIDER_ACCEPTED', 'RIDER_AT_KITCHEN', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'] as OrderStatus[]).map((st) => (
              <TouchableOpacity
                key={st}
                style={[styles.chip, activeOrder?.status === st && styles.chipActive]}
                onPress={() => {
                  if (!activeOrder) useOrderStore.setState({ activeOrder: canonicalMockOrder });
                  updateOrderStatus(st);
                  showToast(`Order status: ${st}`, 'info');
                }}
              >
                <Text style={[styles.chipText, activeOrder?.status === st && styles.chipTextActive]}>{st}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <SecondaryButton
          title="Reset Everything to Default"
          onPress={handleReset}
          tone="danger"
          style={styles.resetBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.massive,
    gap: spacing.md,
  },
  card: {
    padding: spacing.md,
  },
  sectionHeader: {
    ...typography.subtitle2,
    color: colors.brandYellow,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
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
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.brandYellow,
    fontWeight: '700',
  },
  offerBtn: {
    marginVertical: spacing.sm,
  },
  resetBtn: {
    marginTop: spacing.md,
  },
});
