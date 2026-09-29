/**
 * Screen 12: Arrive at Destination
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 12)
 * "Reach the customer location."
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
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';
import { typography } from '../src/constants/typography';
import { useUIStore } from '../src/store/uiStore';

import { orderService } from '../services';

import { useOrderStore } from '../src/store/orderStore';

export default function ArriveDestinationScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [loading, setLoading] = React.useState(false);

  const handleReached = async () => {
    try {
      setLoading(true);
      await orderService.markArrivedAtCustomer('2FS28734');
      useOrderStore.getState().advanceStage();
      showToast('Arrived at customer doorstep! Please contact customer.', 'success');
      router.push('/call-customer' as any);
    } catch {
      router.push('/call-customer' as any);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Arrived at Destination</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Address Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeaderRow}>
            <Ionicons name="location" size={22} color="#EF4444" />
            <Text style={styles.locationHeading}>Customer Location</Text>
          </View>
          <Text style={styles.addressText}>
            12, Green Park Street, Chennai - 600028
          </Text>

          <PrimaryButton
            title={loading ? "Updating..." : "Reached"}
            onPress={handleReached}
            loading={loading}
            style={styles.reachedBtn}
          />
        </View>

        {/* Radar Pinpoint Graphic */}
        <View style={styles.radarWrapper}>
          <View style={styles.radarCircleOuter}>
            <View style={styles.radarCircleMid}>
              <View style={styles.radarCircleInner}>
                <Ionicons name="location" size={36} color="#B45309" />
              </View>
            </View>
          </View>
          <Text style={styles.radarNotice}>Within 20 meters of destination</Text>
        </View>

        <Text style={styles.captionText}>Reach the customer location.</Text>
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
    gap: 20,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addressText: {
    ...typography.subtitle1,
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 22,
  },
  reachedBtn: {
    width: '100%',
    marginTop: 6,
  },
  radarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  radarCircleOuter: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 183, 0, 0.4)',
  },
  radarCircleMid: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.brandYellow,
  },
  radarCircleInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.brandYellow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  radarNotice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
