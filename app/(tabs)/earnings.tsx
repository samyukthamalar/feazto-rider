/**
 * Screen 19: Earnings
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 19)
 * "Manage profile, KYC, payment details, support and more."
 */

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { earningsService } from '../../services';
import { useUIStore } from '../../src/store/uiStore';

export default function EarningsScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [earnings, setEarnings] = useState({
    totalEarnings: 1250,
    completedDeliveries: 5,
    deliveryEarnings: 1050,
    incentives: 200,
  });

  const loadEarnings = useCallback(async () => {
    try {
      const data = await earningsService.getEarningsSummary(period);
      if (data) {
        setEarnings({
          totalEarnings: data.totalEarnings,
          completedDeliveries: data.completedDeliveries,
          deliveryEarnings: data.deliveryEarnings,
          incentives: data.incentives,
        });
      }
    } catch (err) {
      // keep current
    }
  }, [period]);

  useFocusEffect(
    useCallback(() => {
      loadEarnings();
    }, [loadEarnings])
  );

  const cyclePeriod = () => {
    const nextPeriod = period === 'today' ? 'week' : period === 'week' ? 'month' : 'today';
    setPeriod(nextPeriod);
    showToast(`Showing ${nextPeriod.toUpperCase()} earnings`, 'info');
  };

  const handleViewDetails = () => {
    setShowDetailedBreakdown(!showDetailedBreakdown);
    showToast(showDetailedBreakdown ? 'Summary mode' : 'Detailed breakdown view active', 'info');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Earnings Hero Card */}
        <View style={styles.earningsHeroCard}>
          {/* Filter selector */}
          <TouchableOpacity style={styles.filterPill} onPress={cyclePeriod}>
            <Text style={styles.filterText}>
              {period === 'today' ? 'Today' : period === 'week' ? 'This Week' : 'This Month'}
            </Text>
            <Ionicons name="chevron-down" size={14} color="#6B7280" />
          </TouchableOpacity>

          {/* Big Amount */}
          <Text style={styles.bigAmount}>₹{earnings.totalEarnings.toLocaleString('en-IN')}</Text>
          <Text style={styles.deliveriesCount}>{earnings.completedDeliveries} Deliveries</Text>

          <View style={styles.divider} />

          {/* Breakdown Items */}
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Delivery Earnings</Text>
            <Text style={styles.breakdownValue}>₹{earnings.deliveryEarnings.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Incentives</Text>
            <Text style={[styles.breakdownValue, styles.incentivesValue]}>₹{earnings.incentives.toLocaleString('en-IN')}</Text>
          </View>

          {showDetailedBreakdown && (
            <View style={styles.detailedSection}>
              <View style={styles.detailedItem}>
                <Text style={styles.detailedLabel}>• Base Distance Pay</Text>
                <Text style={styles.detailedVal}>₹850</Text>
              </View>
              <View style={styles.detailedItem}>
                <Text style={styles.detailedLabel}>• Surge & Monsoon Bonus</Text>
                <Text style={styles.detailedVal}>₹200</Text>
              </View>
              <View style={styles.detailedItem}>
                <Text style={styles.detailedLabel}>• On-time Completion Incentive</Text>
                <Text style={styles.detailedVal}>₹200</Text>
              </View>
              <View style={styles.upiNoteBox}>
                <Text style={styles.upiNoteText}>Linked Payout VPA: rider@okhdfcbank (Direct Daily Payout)</Text>
              </View>
            </View>
          )}

          {/* Payout Status Indicator */}
          <View style={styles.payoutStatusRow}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={styles.payoutStatusText}>
              Payout Status: Active (Direct daily UPI settlement to HDFC Bank)
            </Text>
          </View>

          {/* Primary View Details Button */}
          <PrimaryButton
            title={showDetailedBreakdown ? 'Hide Details' : 'View Details'}
            onPress={handleViewDetails}
            style={styles.viewDetailsBtn}
          />
        </View>


        {/* Quick management shortcuts */}
        <View style={styles.quickCard}>
          <TouchableOpacity style={styles.quickRow} onPress={() => router.push('/logout' as any)}>
            <View style={styles.quickLeft}>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={styles.logoutText}>Logout of Session</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.captionText}>
          Manage profile, KYC, payment details, support and more.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  earningsHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  bigAmount: {
    fontSize: 40,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -1,
  },
  deliveriesCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
  },
  breakdownRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  breakdownLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  incentivesValue: {
    color: '#059669',
  },
  detailedSection: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    gap: 8,
  },
  detailedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailedLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailedVal: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '700',
  },
  upiNoteBox: {
    marginTop: 4,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  upiNoteText: {
    fontSize: 11,
    color: '#B45309',
    fontWeight: '600',
  },
  payoutStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  payoutStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
    flex: 1,
  },
  viewDetailsBtn: {
    width: '100%',
    marginTop: 16,
  },

  quickCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  quickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  quickLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});
