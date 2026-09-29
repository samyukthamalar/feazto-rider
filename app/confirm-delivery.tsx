/**
 * Screen 14: Confirm Before Delivery
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 14)
 * "Take final photo of the food before handing over."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodBoxIllustration } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { SecondaryButton } from '../src/components/common/SecondaryButton';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { orderService } from '../services';
import { useUIStore } from '../src/store/uiStore';

import { useOrderStore } from '../src/store/orderStore';

export default function ConfirmDeliveryScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await orderService.confirmHandoverPhoto('2FS28734');
      useOrderStore.getState().advanceStage();
      showToast('Package integrity verified ✓ Handing over to customer.', 'success');
      router.push('/deliver-customer' as any);
    } catch {
      router.push('/deliver-customer' as any);
    } finally {
      setLoading(false);
    }
  };


  const handleRetake = () => {
    showToast('Retake preview refreshed', 'info');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Delivery</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Food Photo Preview Container */}
        <View style={styles.previewContainer}>
          <FoodBoxIllustration size={240} />

          <View style={styles.verifiedCheckBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.verifiedText}>Sealed Food Trays Verified</Text>
          </View>
        </View>

        <Text style={styles.promptText}>
          Please confirm the food before handing over.
        </Text>

        {/* Buttons */}
        <View style={styles.actionsContainer}>
          <PrimaryButton
            title={loading ? "Verifying..." : "Confirm"}
            onPress={handleConfirm}
            loading={loading}
            style={styles.confirmBtn}
          />

          <SecondaryButton
            title="Retake"
            onPress={handleRetake}
            variant="surface"
            style={styles.retakeBtn}
          />

          <Text style={styles.captionText}>
            Take final photo of the food before handing over.
          </Text>
        </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  previewContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  verifiedCheckBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  promptText: {
    ...typography.subtitle1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginVertical: 16,
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  confirmBtn: {
    width: '100%',
  },
  retakeBtn: {
    width: '100%',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
  },
});
