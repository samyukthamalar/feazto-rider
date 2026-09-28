/**
 * Screen 11: Navigate to Customer
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 11)
 * "Track delivery location and navigate to customer."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapRouteGraphic } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { WorkflowBar } from '../src/components/common/WorkflowBar';
import { colors } from '../src/constants/colors';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';

export default function NavigateCustomerScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);

  const handleStartNav = () => {
    showToast('Approaching customer drop-off zone (Simulated GPS)', 'info');
    router.push('/arrive-destination' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={11} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Navigate to Customer</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Map View */}
        <View style={styles.mapWrapper}>
          <MapRouteGraphic height={340} />
        </View>

        {/* Floating Destination Bottom Card */}
        <View style={styles.bottomCard}>
          <View style={styles.locationHeaderRow}>
            <View style={styles.locationIconBox}>
              <Ionicons name="location" size={20} color="#EF4444" />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>Customer Location</Text>
              <Text style={styles.locationMeta}>2.4 km • 8 mins</Text>
            </View>
          </View>

          <PrimaryButton
            title="Navigation"
            onPress={handleStartNav}
            style={styles.navBtn}
            icon={<Ionicons name="navigate" size={18} color="#111827" style={{ marginRight: 6 }} />}
          />
        </View>

        <Text style={styles.captionText}>
          Track delivery location and navigate to customer.
        </Text>
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
    padding: 16,
    gap: 16,
  },
  mapWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 14,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  locationMeta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  navBtn: {
    width: '100%',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});
