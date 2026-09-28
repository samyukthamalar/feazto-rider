/**
 * Screen 16: Order Completed
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 16)
 * "Order successfully completed."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CelebrationIllustration } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { WorkflowBar } from '../src/components/common/WorkflowBar';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';

export default function OrderCompletedScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);

  const handleGoHome = () => {
    showToast('Earnings credited to wallet (+₹286)!', 'success');
    router.push('/(tabs)/orders');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={16} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Completed</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.centerContent}>
          {/* Trophy & Confetti celebration graphic */}
          <CelebrationIllustration size={120} />

          {/* Heading */}
          <Text style={styles.title}>Great Job!</Text>
          <Text style={styles.subtitle}>You've completed the order.</Text>

          {/* Payout Tag */}
          <View style={styles.payoutTag}>
            <Text style={styles.payoutLabel}>CREDITED TO EARNINGS</Text>
            <Text style={styles.payoutAmount}>+₹286.00</Text>
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Go to Home"
            onPress={handleGoHome}
            style={styles.homeBtn}
          />
          <Text style={styles.captionText}>
            Order successfully completed.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
  payoutTag: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: colors.brandYellow,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  payoutLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.8,
  },
  payoutAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
    marginTop: 2,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  homeBtn: {
    width: '100%',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
