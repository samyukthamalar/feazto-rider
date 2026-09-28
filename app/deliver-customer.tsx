/**
 * Screen 15: Deliver to Customer
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 15)
 * "Complete delivery and mark as delivered."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { WorkflowBar } from '../src/components/common/WorkflowBar';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';

export default function DeliverCustomerScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);

  const handleFinish = () => {
    showToast('Delivery completed and recorded in trip logs!', 'success');
    router.push('/order-completed' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={15} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Completed</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.centerContent}>
          {/* Green Checkmark Badge */}
          <View style={styles.checkOuter}>
            <View style={styles.checkInner}>
              <Ionicons name="checkmark" size={60} color="#FFFFFF" />
            </View>
          </View>

          {/* Heading */}
          <Text style={styles.title}>Order delivered successfully!</Text>
          <Text style={styles.subtitle}>Customer received the order.</Text>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Finish"
            onPress={handleFinish}
            style={styles.finishBtn}
          />
          <Text style={styles.captionText}>
            Complete delivery and mark as delivered.
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
  checkOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  checkInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    ...typography.h2,
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  finishBtn: {
    width: '100%',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
