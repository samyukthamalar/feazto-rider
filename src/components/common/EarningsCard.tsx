/**
 * FEAzTO Rider Design System - EarningsCard Component
 * Source of truth: FEAzTO Rider Master Prompt Section 5, 6, 10, 28
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Card } from './Card';
import { PrimaryButton } from './PrimaryButton';

interface EarningsCardProps {
  todayTotal: number;
  completedDeliveries: number;
  distanceKm: number;
  cashoutAvailable?: number;
  onCashoutPress?: () => void;
  isCashoutLoading?: boolean;
  breakdown?: {
    base: number;
    rain: number;
    peak: number;
    festival: number;
    tips: number;
  };
}

export const EarningsCard: React.FC<EarningsCardProps> = ({
  todayTotal,
  completedDeliveries,
  distanceKm,
  cashoutAvailable,
  onCashoutPress,
  isCashoutLoading = false,
  breakdown,
}) => {
  return (
    <Card style={styles.card} variant="highlight">
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.tag}>TODAY'S ACCUMULATED EARNINGS</Text>
          <Text style={styles.amount}>₹{todayTotal}</Text>
          <Text style={styles.subtitle}>
            {completedDeliveries} completed drops • {distanceKm} km on duty
          </Text>
        </View>
      </View>

      {/* Itemized Breakdown if provided */}
      {breakdown && (
        <View style={styles.breakdownContainer}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Base</Text>
            <Text style={styles.breakdownValue}>₹{breakdown.base}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Rain 🌧️</Text>
            <Text style={[styles.breakdownValue, styles.bonusText]}>+₹{breakdown.rain}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Peak ⚡</Text>
            <Text style={[styles.breakdownValue, styles.bonusText]}>+₹{breakdown.peak}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Festival 🎉</Text>
            <Text style={[styles.breakdownValue, styles.bonusText]}>₹{breakdown.festival}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Tips ⭐</Text>
            <Text style={[styles.breakdownValue, styles.tipText]}>+₹{breakdown.tips}</Text>
          </View>
        </View>
      )}

      {/* Cashout footer */}
      {cashoutAvailable !== undefined && onCashoutPress && (
        <View style={styles.cashoutRow}>
          <View>
            <Text style={styles.cashoutSub}>Available Balance</Text>
            <Text style={styles.cashoutAmount}>₹{cashoutAvailable}</Text>
          </View>

          <PrimaryButton
            title={isCashoutLoading ? 'Processing...' : 'Instant Cashout'}
            onPress={onCashoutPress}
            loading={isCashoutLoading}
            style={styles.cashoutBtn}
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tag: {
    ...typography.caption,
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  amount: {
    ...typography.h1,
    color: colors.brandYellow,
    fontSize: 34,
    marginVertical: 4,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textPrimary,
  },
  breakdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: spacing.sm + 2,
    borderRadius: 8,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  breakdownItem: {
    alignItems: 'center',
  },
  breakdownLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  breakdownValue: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bonusText: {
    color: colors.brandYellow,
  },
  tipText: {
    color: colors.success,
  },
  cashoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cashoutSub: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  cashoutAmount: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  cashoutBtn: {
    height: 38,
    minHeight: 38,
    paddingHorizontal: spacing.md,
  },
});
