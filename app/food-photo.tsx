/**
 * Screen 9: Food Photo Capture
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 9)
 * "Take photo of the food (optional for demo)."
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
import { SecondaryButton } from '../src/components/common/SecondaryButton';
import { WorkflowBar } from '../src/components/common/WorkflowBar';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';

export default function FoodPhotoScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const handleCapture = () => {
    setPhotoCaptured(true);
    showToast('Food photo captured successfully!', 'success');
    setTimeout(() => {
      router.push('/start-delivery' as any);
    }, 600);
  };

  const handleRetake = () => {
    setPhotoCaptured(false);
    showToast('Ready to capture new photo', 'info');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={9} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Capture Food Photo</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Viewfinder Preview Box */}
        <View style={styles.viewfinderCard}>
          <View style={styles.viewfinderCornerTL} />
          <View style={styles.viewfinderCornerTR} />
          <View style={styles.viewfinderCornerBL} />
          <View style={styles.viewfinderCornerBR} />

          <FoodBoxIllustration size={230} />

          <View style={styles.photoOverlayNotice}>
            <Text style={styles.overlayNoticeText}>
              {photoCaptured ? '✓ Photo Captured' : 'Align parcel inside camera frame'}
            </Text>
          </View>
        </View>

        {/* Capture Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.shutterBtn}
            onPress={handleCapture}
            activeOpacity={0.85}
          >
            <Ionicons name="camera" size={32} color="#111827" />
          </TouchableOpacity>

          <SecondaryButton
            title="Retake"
            onPress={handleRetake}
            variant="outline"
            style={styles.retakeBtn}
          />

          <Text style={styles.captionText}>
            Take photo of the food (optional for demo).
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
  viewfinderCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 260,
  },
  viewfinderCornerTL: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.brandYellow,
    borderTopLeftRadius: 6,
  },
  viewfinderCornerTR: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.brandYellow,
    borderTopRightRadius: 6,
  },
  viewfinderCornerBL: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.brandYellow,
    borderBottomLeftRadius: 6,
  },
  viewfinderCornerBR: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.brandYellow,
    borderBottomRightRadius: 6,
  },
  photoOverlayNotice: {
    position: 'absolute',
    bottom: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  overlayNoticeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  controlsContainer: {
    alignItems: 'center',
    gap: 16,
    marginTop: 20,
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brandYellow,
    borderWidth: 4,
    borderColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  retakeBtn: {
    width: 140,
    height: 40,
    minHeight: 40,
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
});
