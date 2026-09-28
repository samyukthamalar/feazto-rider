/**
 * Screen 8: Receive Food from Cloud Kitchen
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 8)
 * "Go to cloud kitchen, receive food and scan the order QR for verification."
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
import { CloudKitchenQRCode } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { WorkflowBar } from '../src/components/common/WorkflowBar';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';

export default function PickupQRScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    showToast('Scanning Cloud Kitchen Order QR...', 'info');
    setTimeout(() => {
      setScanning(false);
      showToast('QR Verified ✓ Order #2FS28734 match confirmed!', 'success');
      router.push('/food-photo' as any);
    }, 1000);
  };

  const handleSkip = () => {
    showToast('Skipped QR verification (Demo Mode)', 'info');
    router.push('/food-photo' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={8} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pickup at Cloud Kitchen</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centerCard}>
          <Text style={styles.kitchenName}>Biryani Box Hub</Text>
          <Text style={styles.orderTag}>Order #2FS28734</Text>

          {/* QR Code graphic matching reference diagram */}
          <View style={styles.qrWrapper}>
            <CloudKitchenQRCode size={190} />
          </View>

          <Text style={styles.instruction}>Scan QR to verify order</Text>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <PrimaryButton
            title={scanning ? 'Verifying Code...' : 'Scan QR'}
            onPress={handleScan}
            loading={scanning}
            style={styles.scanBtn}
          />

          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip (Demo)</Text>
          </TouchableOpacity>

          <Text style={styles.captionText}>
            Go to cloud kitchen, receive food and scan the order QR for verification.
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
  centerCard: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  kitchenName: {
    ...typography.h3,
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
  },
  orderTag: {
    fontSize: 13,
    color: '#B45309',
    fontWeight: '700',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 20,
  },
  qrWrapper: {
    marginVertical: 10,
  },
  instruction: {
    ...typography.subtitle1,
    color: '#111827',
    fontWeight: '700',
    marginTop: 20,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  scanBtn: {
    width: '100%',
  },
  skipBtn: {
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 290,
  },
});
