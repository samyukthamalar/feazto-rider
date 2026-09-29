/**
 * Screen 10: Start Delivery
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 10)
 * "After photo confirmation, start the delivery."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';
import { orderService } from '../services/orderService';
import { useState } from 'react';

import { useOrderStore } from '../src/store/orderStore';

export default function StartDeliveryScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [loading, setLoading] = useState(false);

  const handleStartDelivery = async () => {
    setLoading(true);
    await orderService.startDelivery('2FS28734');
    useOrderStore.getState().updateOrderStatus('OUT_FOR_DELIVERY');
    useOrderStore.getState().advanceStage();
    setLoading(false);
    showToast('Status: Out for Delivery! Starting navigation to customer.', 'success');
    router.push('/navigate-customer' as any);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          {/* Green Checkmark Circle */}
          <View style={styles.circleOuter}>
            <View style={styles.circleInner}>
              <Ionicons name="checkmark" size={52} color="#FFFFFF" />
            </View>
          </View>

          {/* Heading */}
          <Text style={styles.title}>Order Verified!</Text>
          <Text style={styles.subtitle}>Food ready for delivery.</Text>

          {/* Start Delivery Button */}
          <PrimaryButton
            title={loading ? "Starting..." : "Start Delivery"}
            onPress={handleStartDelivery}
            loading={loading}
            style={styles.startBtn}
          />

          {/* Order Info Pill at bottom */}
          <View style={styles.orderPill}>
            <Text style={styles.orderPillId}>Order #2FS28734</Text>
            <View style={styles.pillDivider} />
            <Text style={styles.orderPillMetrics}>2.4 km • 8 mins</Text>
          </View>
        </View>

        <Text style={styles.captionText}>
          After photo confirmation, start the delivery.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleOuter: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  circleInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    ...typography.h2,
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 28,
  },
  startBtn: {
    width: '100%',
    marginBottom: 20,
  },
  orderPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderPillId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  pillDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
  },
  orderPillMetrics: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
